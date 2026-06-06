from rest_framework import serializers
from .models import Project, ProjectCategory, ProjectScreenshot

class ProjectScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectScreenshot
        fields = ['id', 'image', 'caption']

class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = '__all__'

class ProjectListSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'short_description', 'category_name', 'tech_stack', 'featured_image', 'is_featured', 'order', 'created_at']

class ProjectDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    screenshots = ProjectScreenshotSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = '__all__'
