from django.db import models
from django.utils.text import slugify

class Domain(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    order = models.IntegerField(default=0)
    icon = models.CharField(max_length=50, help_text="Lucide icon name", blank=True)
    key_concepts = models.JSONField(default=list) # List of concepts

    class Meta:
        ordering = ['order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class ContentSection(models.Model):
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE, related_name='sections')
    title = models.CharField(max_length=255)
    slug = models.SlugField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']
        unique_together = ('domain', 'slug')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.domain.name} - {self.title}"

class Subsection(models.Model):
    FORMAT_CHOICES = [
        ('text', 'Text'),
        ('diagram', 'Diagram'),
        ('code', 'Code'),
        ('pattern', 'Pattern'),
        ('case_study', 'Case Study'),
    ]
    section = models.ForeignKey(ContentSection, on_delete=models.CASCADE, related_name='subsections')
    title = models.CharField(max_length=255)
    content = models.TextField() # Markdown
    content_format = models.CharField(max_length=50, choices=FORMAT_CHOICES, default='text')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return f"{self.section.title} - {self.title}"

class LearningPath(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    target_audience = models.CharField(max_length=255)
    steps = models.JSONField(default=list) # List of {title, description, domain_slug}

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class EcosystemTool(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100) # Framework, Vendor, DB, etc.
    description = models.TextField()
    url = models.URLField(blank=True)

    def __str__(self):
        return self.name
