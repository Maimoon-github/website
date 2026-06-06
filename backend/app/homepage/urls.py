from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HeroContentViewSet, StatCounterViewSet, PageSectionViewSet, PageHeaderViewSet

router = DefaultRouter()
router.register(r'hero', HeroContentViewSet)
router.register(r'stats', StatCounterViewSet)
router.register(r'sections', PageSectionViewSet, basename='sections')
router.register(r'headers', PageHeaderViewSet, basename='headers')

urlpatterns = [
    path('', include(router.urls)),
]
