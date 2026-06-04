from django.db import models

class HeroSection(models.Model):
    title = models.CharField(max_length=255)
    role_title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    tech_stack = models.TextField(blank=True, help_text="Comma-separated list of tech stack items")
    cta_primary_text = models.CharField(max_length=50, blank=True)
    cta_primary_link = models.CharField(max_length=255, blank=True)
    hero_image = models.ImageField(upload_to='home/hero/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class BioSection(models.Model):
    title = models.CharField(max_length=255, default="Bio Info")
    content = models.TextField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class JourneyPhase(models.Model):
    phase_number = models.PositiveIntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    
    class Meta:
        ordering = ['phase_number']

    def __str__(self):
        return f"Phase {self.phase_number}: {self.title}"
