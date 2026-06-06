from rest_framework import serializers
from .models import Domain, LearningPath, EcosystemTool

class EcosystemToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = EcosystemTool
        fields = '__all__'

class DomainSerializer(serializers.ModelSerializer):
    tools = EcosystemToolSerializer(many=True, read_only=True)

    class Meta:
        model = Domain
        fields = ['id', 'name', 'slug', 'description', 'icon', 'order', 'key_concepts', 'tools']

class LearningPathSerializer(serializers.ModelSerializer):
    domains = DomainSerializer(many=True, read_only=True)

    class Meta:
        model = LearningPath
        fields = '__all__'
