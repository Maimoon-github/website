from rest_framework import serializers
from .models import Domain, ContentSection, Subsection, LearningPath, EcosystemTool

class SubsectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsection
        fields = '__all__'

class ContentSectionSerializer(serializers.ModelSerializer):
    subsections = SubsectionSerializer(many=True, read_only=True)
    class Meta:
        model = ContentSection
        fields = '__all__'

class DomainListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = ['id', 'name', 'slug', 'description', 'order', 'icon', 'key_concepts']

class DomainDetailSerializer(serializers.ModelSerializer):
    sections = ContentSectionSerializer(many=True, read_only=True)
    class Meta:
        model = Domain
        fields = '__all__'

class LearningPathSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningPath
        fields = '__all__'

class EcosystemToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = EcosystemTool
        fields = '__all__'
