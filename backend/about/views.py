from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import AboutSection, TeamMember
from .serializers import AboutSectionSerializer, TeamMemberSerializer

class AboutPageView(APIView):
    def get(self, request):
        section = AboutSection.objects.first()
        team = TeamMember.objects.all()
        return Response({
            "section": AboutSectionSerializer(section).data if section else None,
            "team": TeamMemberSerializer(team, many=True).data
        })

class AboutSectionDetail(generics.ListAPIView):
    queryset = AboutSection.objects.all()
    serializer_class = AboutSectionSerializer

class TeamMemberList(generics.ListAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
