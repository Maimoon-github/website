from django.db import models

class HeroSection(models.Model):
    title = models.CharField(max_length=255)
    title_accent = models.CharField(max_length=255, blank=True, help_text="The accent part of the title (e.g. 'Engineer Architect')")
    system_status = models.CharField(max_length=100, default="SYSTEM ARCHITECTURE READY")
    description = models.TextField(blank=True)
    tech_stack = models.TextField(blank=True, help_text="Comma-separated items for the marquee bar")
    
    # Initialize Protocol (Primary CTA)
    protocol_text = models.CharField(max_length=50, default="INITIALIZE PROTOCOL")
    protocol_link = models.CharField(max_length=255, blank=True)
    
    # View Architecture (Secondary CTA)
    architecture_text = models.CharField(max_length=50, default="VIEW ARCHITECTURE")
    architecture_link = models.CharField(max_length=255, blank=True)
    
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
