from .models import HeroContent, StatCounter, PageSection, PageHeader

class HeroContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroContent
        fields = '__all__'

class StatCounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatCounter
        fields = '__all__'

class PageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageSection
        fields = '__all__'

class PageHeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageHeader
        fields = '__all__'
