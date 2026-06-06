from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HeroContentViewSet, StatCounterViewSet, PageSectionViewSet

router = DefaultRouter()
router.register(r'hero', HeroContentViewSet)
router.register(r'stats', StatCounterViewSet)
router.register(r'sections', PageSectionViewSet, basename='sections')

urlpatterns = [
    path('', include(router.urls)),
]
