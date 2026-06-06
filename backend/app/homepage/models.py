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
