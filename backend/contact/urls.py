from django.urls import path
from .views import ContactInfoDetail, ContactMessageCreate

urlpatterns = [
    path('info/', ContactInfoDetail.as_view(), name='contact-info'),
    path('message/', ContactMessageCreate.as_view(), name='contact-message-create'),
]
