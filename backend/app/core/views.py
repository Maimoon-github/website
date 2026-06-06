from rest_framework import viewsets
from .models import AboutProfile, Skill, Experience, Education
from .serializers import AboutProfileSerializer, SkillSerializer, ExperienceSerializer, EducationSerializer

class AboutProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutProfile.objects.all()
    serializer_class = AboutProfileSerializer

    def get_object(self):
        return AboutProfile.objects.first()

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    filterset_fields = ['category']

class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
