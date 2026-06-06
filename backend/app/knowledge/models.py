from django.db import models

class Domain(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    icon = models.CharField(max_length=50, help_text="Lucide icon name")
    order = models.IntegerField(default=0)
    key_concepts = models.JSONField(default=list)
    specs = models.JSONField(default=dict, blank=True, help_text="e.g. {'Throughput': 'High', 'Latency': 'Low'}")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class LearningPath(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    target_audience = models.CharField(max_length=100)
    domains = models.ManyToManyField(Domain, related_name='learning_paths')

    def __str__(self):
        return self.title

class EcosystemTool(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    description = models.TextField()
    url = models.URLField(max_length=500, blank=True, null=True)
    domain = models.ForeignKey(Domain, on_delete=models.CASCADE, related_name='tools')

    def __str__(self):
        return self.name
