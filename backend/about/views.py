from rest_framework import generics
from .models import AboutSection, TeamMember
from .serializers import AboutSectionSerializer, TeamMemberSerializer

class AboutSectionDetail(generics.ListAPIView):
    queryset = AboutSection.objects.all()
    serializer_class = AboutSectionSerializer

class TeamMemberList(generics.ListAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
