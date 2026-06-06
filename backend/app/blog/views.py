from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post, Category, Tag
from .serializers import PostSerializer, CategorySerializer, TagSerializer, CommentSerializer

class PostViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PostSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Post.objects.all()
        category = self.request.query_params.get('category')
        tag = self.request.query_params.get('tag')
        search = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category__slug=category)
        if tag:
            queryset = queryset.filter(tags__slug=tag)
        if search:
            queryset = queryset.filter(title__icontains=search) | queryset.filter(content__icontains=search)
            
        return queryset.distinct()

    @action(detail=True, methods=['post'])
    def comment(self, request, slug=None):
        post = self.get_object()
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'
