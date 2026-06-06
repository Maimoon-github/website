from rest_framework import serializers
from .models import Project, ProjectCategory, ProjectScreenshot

class ProjectScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectScreenshot
        fields = ['id', 'image', 'caption']

class ProjectSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    screenshots = ProjectScreenshotSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'category_name', 
            'short_description', 'description', 'featured_image', 
            'tech_stack', 'github_url', 'live_url', 'is_featured', 
            'screenshots', 'created_at'
        ]

class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = '__all__'
