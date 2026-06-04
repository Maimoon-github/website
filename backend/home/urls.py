from django.urls import path
from .views import HomeDataView

urlpatterns = [
    path('', HomeDataView.as_view(), name='home-data'),
]
