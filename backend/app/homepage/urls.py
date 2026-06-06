from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HeroContentViewSet, StatCounterViewSet

router = DefaultRouter()
router.register(r'hero', HeroContentViewSet)
router.register(r'stats', StatCounterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
