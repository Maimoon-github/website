from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet

router = DefaultRouter()
router.register(r'messages', ContactViewSet, basename='contact-messages')

urlpatterns = [
    path('', include(router.urls)),
]
