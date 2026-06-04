from django.db import models

class AboutSection(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    mission_statement = models.TextField(blank=True)
    vision_statement = models.TextField(blank=True)
    featured_image = models.ImageField(upload_to='about/', blank=True, null=True)

    def __str__(self):
        return self.title

class TeamMember(models.Model):
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    photo = models.ImageField(upload_to='about/team/', blank=True, null=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} - {self.role}"
