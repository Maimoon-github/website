from django.db import models

class HeroContent(models.Model):
    title = models.CharField(max_length=200, default="Architecting Autonomous Intelligence")
    tagline = models.CharField(max_length=200, default="The Future of Agentic AI Engineering")
    description = models.TextField(default="A comprehensive knowledge hub and portfolio dedicated to production-grade Agentic AI systems.")
    primary_cta_text = models.CharField(max_length=50, default="Explore Domains")
    primary_cta_link = models.CharField(max_length=200, default="/knowledge")
    secondary_cta_text = models.CharField(max_length=50, default="View Projects")
    secondary_cta_link = models.CharField(max_length=200, default="/projects")
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Hero Content"
        ordering = ['-updated_at']

    def __str__(self):
        return f"Homepage Hero - {self.updated_at}"

class StatCounter(models.Model):
    label = models.CharField(max_length=50)
    value = models.CharField(max_length=20)
    icon = models.CharField(max_length=50, help_text="Lucide icon name")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label

class PageSection(models.Model):
    PAGE_CHOICES = [
        ('home', 'Homepage'),
        ('about', 'About Page'),
        ('projects', 'Projects Page'),
        ('blog', 'Blog Page'),
        ('knowledge', 'Knowledge Hub'),
        ('contact', 'Contact Page'),
    ]
    page = models.CharField(max_length=20, choices=PAGE_CHOICES)
    title = models.CharField(max_length=100)
    endpoint = models.CharField(max_length=255, help_text="Local API path (e.g., about/awards/)")
    component_type = models.CharField(max_length=50, default='generic', help_text="Component to use (e.g., hero, grid, stats, generic)")
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.get_page_display()} - {self.title}"

class PageHeader(models.Model):
    PAGE_CHOICES = PageSection.PAGE_CHOICES
    page = models.CharField(max_length=20, choices=PAGE_CHOICES, unique=True)
    badge = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=100)
    highlighted_word = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Page Headers"

    def __str__(self):
        return f"Header for {self.get_page_display()}"
