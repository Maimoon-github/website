from rest_framework import serializers
from .models import (
    State, City, Amenity, OccasionTag,
    Hotel, HotelImage, BlogPost,
    NewsletterSubscriber, HotelSubmission
)


class StateSerializer(serializers.ModelSerializer):
    """Serializer for State model"""
    city_count = serializers.IntegerField(read_only=True)
    hotel_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = State
        fields = [
            'id', 'name', 'slug', 'code', 'description',
            'featured_image', 'city_count', 'hotel_count', 'is_active'
        ]


class CitySerializer(serializers.ModelSerializer):
    """Serializer for City model"""
    state_name = serializers.CharField(source='state.name', read_only=True)
    state_code = serializers.CharField(source='state.code', read_only=True)
    hotel_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = City
        fields = [
            'id', 'name', 'slug', 'state', 'state_name', 'state_code',
            'description', 'hotel_count', 'is_active'
        ]


class AmenitySerializer(serializers.ModelSerializer):
    """Serializer for Amenity model"""
    class Meta:
        model = Amenity
        fields = ['id', 'name', 'slug', 'icon', 'category']


class OccasionTagSerializer(serializers.ModelSerializer):
    """Serializer for OccasionTag model"""
    class Meta:
        model = OccasionTag
        fields = ['id', 'name', 'slug', 'description', 'color']


class HotelImageSerializer(serializers.ModelSerializer):
    """Serializer for HotelImage model"""
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = HotelImage
        fields = ['id', 'image_url', 'caption', 'is_hero', 'shows_jacuzzi', 'order']
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class HotelListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for hotel listings"""
    location = serializers.SerializerMethodField()
    hero_image = serializers.SerializerMethodField()
    amenity_icons = serializers.SerializerMethodField()
    occasion_tags = OccasionTagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Hotel
        fields = [
            'id', 'name', 'slug', 'location', 'hero_image',
            'price_from', 'currency', 'guest_rating', 'review_count',
            'amenity_icons', 'occasion_tags', 'is_jacuzzi_verified',
            'booking_com_link', 'expedia_link', 'direct_link'
        ]
    
    def get_location(self, obj):
        return {
            'city': obj.city.name,
            'state': obj.city.state.name,
            'state_code': obj.city.state.code,
        }
    
    def get_hero_image(self, obj):
        hero = obj.images.filter(is_hero=True).first()
        if not hero:
            hero = obj.images.first()
        request = self.context.get('request')
        if hero and hero.image and request:
            return request.build_absolute_uri(hero.image.url)
        return None
    
    def get_amenity_icons(self, obj):
        return [{'name': a.name, 'icon': a.icon} for a in obj.amenities.all()[:6]]


class HotelDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for single hotel view"""
    location = serializers.SerializerMethodField()
    coordinates = serializers.SerializerMethodField()
    images = HotelImageSerializer(many=True, read_only=True)
    amenities = AmenitySerializer(many=True, read_only=True)
    occasions = OccasionTagSerializer(many=True, read_only=True)
    verification_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Hotel
        fields = [
            'id', 'name', 'slug', 'location', 'coordinates', 'address', 'zip_code',
            'phone', 'website',
            'is_jacuzzi_verified', 'verification_details',
            'price_from', 'currency', 'guest_rating', 'review_count',
            'images', 'amenities', 'occasions',
            'seo_title', 'seo_description', 'primary_keyword',
            'booking_com_link', 'expedia_link', 'direct_link',
            'is_featured', 'created_at', 'updated_at'
        ]
    
    def get_location(self, obj):
        return {
            'city': obj.city.name,
            'state': obj.city.state.name,
            'state_code': obj.city.state.code,
            'full': f"{obj.city.name}, {obj.city.state.code}"
        }
    
    def get_coordinates(self, obj):
        if obj.latitude and obj.longitude:
            return {'lat': float(obj.latitude), 'lng': float(obj.longitude)}
        return None
    
    def get_verification_details(self, obj):
        return {
            'verified': obj.is_jacuzzi_verified,
            'date': obj.verification_date.isoformat() if obj.verification_date else None,
            'notes': obj.verification_notes
        }


class BlogPostSerializer(serializers.ModelSerializer):
    """Serializer for blog post listings"""
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    featured_image_url = serializers.SerializerMethodField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image_url',
            'author_name', 'category', 'category_display',
            'published_at', 'reading_time', 'view_count'
        ]
    
    def get_featured_image_url(self, obj):
        request = self.context.get('request')
        if obj.featured_image and request:
            return request.build_absolute_uri(obj.featured_image.url)
        return None


class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for single blog post"""
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    author_bio = serializers.CharField(source='author.profile.bio', read_only=True)
    featured_image_url = serializers.SerializerMethodField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    related_hotels = HotelListSerializer(many=True, read_only=True)
    related_states = StateSerializer(many=True, read_only=True)
    tags_list = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt',
            'featured_image_url', 'featured_image_alt',
            'author_name', 'author_bio',
            'category', 'category_display', 'tags_list',
            'primary_keyword', 'secondary_keywords',
            'seo_title', 'seo_description',
            'related_hotels', 'related_states',
            'is_published', 'published_at', 'reading_time', 'view_count',
            'schema_type', 'faq_data',
            'created_at', 'updated_at'
        ]
    
    def get_featured_image_url(self, obj):
        request = self.context.get('request')
        if obj.featured_image and request:
            return request.build_absolute_uri(obj.featured_image.url)
        return None
    
    def get_tags_list(self, obj):
        if obj.tags:
            return [tag.strip() for tag in obj.tags.split(',')]
        return []


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    """Serializer for newsletter subscription"""
    class Meta:
        model = NewsletterSubscriber
        fields = ['email', 'first_name', 'interests']
        extra_kwargs = {
            'interests': {'required': False},
            'first_name': {'required': False}
        }
    
    def create(self, validated_data):
        # Check if subscriber already exists
        subscriber, created = NewsletterSubscriber.objects.get_or_create(
            email=validated_data['email'],
            defaults=validated_data
        )
        if not created:
            # Update interests if provided
            if 'interests' in validated_data and validated_data['interests']:
                subscriber.interests = validated_data['interests']
                subscriber.save()
        return subscriber


class HotelSubmissionSerializer(serializers.ModelSerializer):
    """Serializer for hotel submissions"""
    class Meta:
        model = HotelSubmission
        fields = '__all__'
        read_only_fields = ['status', 'admin_notes', 'reviewed_by', 'reviewed_at', 'created_at']
