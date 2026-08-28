from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q, Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import (
    State, City, Amenity, OccasionTag,
    Hotel, HotelImage, BlogPost,
    NewsletterSubscriber, HotelSubmission
)
from .serializers import (
    StateSerializer, CitySerializer, AmenitySerializer, OccasionTagSerializer,
    HotelListSerializer, HotelDetailSerializer,
    BlogPostSerializer, BlogPostDetailSerializer,
    NewsletterSubscriberSerializer, HotelSubmissionSerializer
)


class StateViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset for viewing states"""
    queryset = State.objects.filter(is_active=True).annotate(
        city_count=Count('cities', filter=Q(cities__is_active=True)),
        hotel_count=Count('cities__hotels', filter=Q(cities__hotels__is_active=True))
    )
    serializer_class = StateSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    @action(detail=True, methods=['get'])
    def cities(self, request, slug=None):
        """Get all cities in a state"""
        state = self.get_object()
        cities = state.cities.filter(is_active=True).annotate(
            hotel_count=Count('hotels', filter=Q(hotels__is_active=True))
        )
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset for viewing cities"""
    serializer_class = CitySerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = City.objects.filter(is_active=True)
        state_slug = self.request.query_params.get('state', None)
        if state_slug:
            queryset = queryset.filter(state__slug=state_slug)
        return queryset.annotate(
            hotel_count=Count('hotels', filter=Q(hotels__is_active=True))
        )


class AmenityViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset for viewing amenities"""
    queryset = Amenity.objects.filter(is_active=True)
    serializer_class = AmenitySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'


class OccasionTagViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset for viewing occasion tags"""
    queryset = OccasionTag.objects.filter(is_active=True)
    serializer_class = OccasionTagSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'


class HotelViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset for viewing hotels with filtering and search"""
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = {
        'city': ['exact'],
        'city__state': ['exact'],
        'city__state__slug': ['exact'],
        'amenities': ['exact'],
        'occasions': ['exact'],
        'is_jacuzzi_verified': ['exact'],
        'is_featured': ['exact'],
        'price_from': ['lte', 'gte'],
        'guest_rating': ['gte'],
    }
    search_fields = ['name', 'primary_keyword', 'address']
    ordering_fields = ['price_from', 'guest_rating', 'created_at', 'name']
    ordering = ['-is_featured', '-guest_rating']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return HotelDetailSerializer
        return HotelListSerializer
    
    def get_queryset(self):
        queryset = Hotel.objects.filter(
            is_active=True,
            is_jacuzzi_verified=True
        ).select_related(
            'city', 'city__state'
        ).prefetch_related(
            'amenities', 'occasions', 'images'
        )
        
        # Filter by state slug
        state_slug = self.request.query_params.get('state', None)
        if state_slug:
            queryset = queryset.filter(city__state__slug=state_slug)
        
        # Filter by city slug
        city_slug = self.request.query_params.get('city', None)
        if city_slug:
            queryset = queryset.filter(city__slug=city_slug)
        
        # Filter by occasion
        occasion_slug = self.request.query_params.get('occasion', None)
        if occasion_slug:
            queryset = queryset.filter(occasions__slug=occasion_slug)
        
        # Filter by amenity
        amenity_slug = self.request.query_params.get('amenity', None)
        if amenity_slug:
            queryset = queryset.filter(amenities__slug=amenity_slug)
        
        return queryset.distinct()
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured hotels"""
        featured = self.get_queryset().filter(is_featured=True)[:12]
        serializer = HotelListSerializer(featured, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def romantic(self, request):
        """Get romantic hotels"""
        romantic = self.get_queryset().filter(occasions__slug='romantic')[:12]
        serializer = HotelListSerializer(romantic, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def budget(self, request):
        """Get budget-friendly hotels"""
        budget = self.get_queryset().order_by('price_from')[:12]
        serializer = HotelListSerializer(budget, many=True)
        return Response(serializer.data)


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """Viewset for blog posts"""
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = {
        'category': ['exact'],
        'is_published': ['exact'],
    }
    search_fields = ['title', 'content', 'primary_keyword', 'tags']
    ordering_fields = ['published_at', 'view_count', 'created_at']
    ordering = ['-published_at']
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BlogPostDetailSerializer
        return BlogPostSerializer
    
    def get_queryset(self):
        queryset = BlogPost.objects.filter(
            is_published=True
        ).select_related('author').prefetch_related(
            'related_hotels', 'related_states'
        )
        return queryset


class NewsletterSubscriberViewSet(viewsets.ModelViewSet):
    """Viewset for newsletter subscriptions"""
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['post', 'options']  # Only allow POST for subscribing


class HotelSubmissionViewSet(viewsets.ModelViewSet):
    """Viewset for hotel submissions"""
    queryset = HotelSubmission.objects.all()
    serializer_class = HotelSubmissionSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['post', 'get', 'options']  # Allow GET for status checking
