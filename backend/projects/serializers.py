from rest_framework import serializers
from .models import Project, Technology, ProjectImage

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id', 'name', 'icon_name']

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']

class ProjectSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True, read_only=True)
    gallery = ProjectImageSerializer(many=True, read_only=True)
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'category_display', 
            'client_name', 'description', 'role', 'completion_date', 
            'website_url', 'github_url', 'is_featured', 'cover_image', 
            'short_info', 'technologies', 'gallery', 'created_at'
        ]
