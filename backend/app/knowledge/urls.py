from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DomainViewSet, LearningPathViewSet, EcosystemToolViewSet

router = DefaultRouter()
router.register(r'domains', DomainViewSet)
router.register(r'learning-paths', LearningPathViewSet)
router.register(r'tools', EcosystemToolViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
