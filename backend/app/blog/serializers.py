from rest_framework import serializers
from .models import Post, Category, Tag, Comment

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'author_name', 'content', 'created_at']

class PostListSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    author_name = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'excerpt', 'featured_image', 'category_name', 'author_name', 'published_at', 'view_count']

class PostDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    author_name = serializers.ReadOnlyField(source='author.username')
    tags = TagSerializer(many=True, read_only=True)
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_comments(self, obj):
        comments = obj.comments.filter(is_approved=True)
        return CommentSerializer(comments, many=True).data
