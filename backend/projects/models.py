from django.db import models

class Technology(models.Model):
    name = models.CharField(max_length=100)
    icon_name = models.CharField(max_length=100, blank=True, help_text="Lucide icon name")

    class Meta:
        verbose_name_plural = "Technologies"

    def __str__(self):
        return self.name

class Project(models.Model):
    CATEGORIES = [
        ('agentic', 'Agentic AI'),
        ('fullstack', 'Full Stack'),
        ('system', 'System Architecture'),
        ('research', 'Research'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=50, choices=CATEGORIES, default='agentic')
    client_name = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    role = models.CharField(max_length=200, blank=True, help_text="Your role in the project")
    completion_date = models.DateField(null=True, blank=True)
    website_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    cover_image = models.ImageField(upload_to='projects/covers/', blank=True, null=True)
    short_info = models.CharField(max_length=255, blank=True, help_text="Small tagline for the project card")
    technologies = models.ManyToManyField(Technology, related_name='projects', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-completion_date', '-created_at']

    def __str__(self):
        return self.title

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='gallery', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Image for {self.project.title}"
