from django.urls import path
from .views import ContentPageDetail

urlpatterns = [
    path('<slug:slug>/', ContentPageDetail.as_view(), name='page-detail'),
]
