from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AboutProfileViewSet, SkillViewSet, ExperienceViewSet, EducationViewSet

router = DefaultRouter()
router.register(r'profile', AboutProfileViewSet, basename='about-profile')
router.register(r'skills', SkillViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'education', EducationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
