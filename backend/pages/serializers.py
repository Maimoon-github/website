from rest_framework import serializers
from .models import ContentPage

class ContentPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentPage
        fields = '__all__'
