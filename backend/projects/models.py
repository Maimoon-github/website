from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    client_name = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    completion_date = models.DateField(null=True, blank=True)
    website_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    cover_image = models.ImageField(upload_to='projects/covers/', blank=True, null=True)
    short_info = models.CharField(max_length=255, blank=True, help_text="Small tagline for the project card")
    icon_name = models.CharField(max_length=100, blank=True, help_text="Lucide icon name")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-completion_date', '-created_at']

    def __str__(self):
        return self.title
