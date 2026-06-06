from rest_framework import serializers
from .models import AboutProfile, Skill, Experience, Education

class AboutProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutProfile
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'
