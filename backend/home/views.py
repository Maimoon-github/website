from rest_framework.views import APIView
from rest_framework.response import Response
from .models import HeroSection, BioSection, JourneyPhase
from .serializers import HeroSectionSerializer, BioSectionSerializer, JourneyPhaseSerializer

class HomeDataView(APIView):
    def get(self, request):
        hero = HeroSection.objects.filter(is_active=True).first()
        bio = BioSection.objects.filter(is_active=True).first()
        journey = JourneyPhase.objects.all()

        return Response({
            "hero": HeroSectionSerializer(hero).data if hero else None,
            "bio": BioSectionSerializer(bio).data if bio else None,
            "journey": JourneyPhaseSerializer(journey, many=True).data
        })
