from rest_framework import serializers
from .models import HeroSection, BioSection, JourneyPhase

class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = '__all__'

class BioSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BioSection
        fields = '__all__'

class JourneyPhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = JourneyPhase
        fields = '__all__'
