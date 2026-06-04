from django.db import models

class HeroSection(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.TextField(blank=True)
    cta_primary_text = models.CharField(max_length=50, blank=True)
    cta_primary_link = models.CharField(max_length=255, blank=True)
    cta_secondary_text = models.CharField(max_length=50, blank=True)
    cta_secondary_link = models.CharField(max_length=255, blank=True)
    background_image = models.ImageField(upload_to='home/hero/', blank=True, null=True)
    is_active = models.BooleanField(default=True, help_text="Set to True to make this the active hero.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - Active: {self.is_active}"
