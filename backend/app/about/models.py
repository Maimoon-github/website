from django.db import models

class AboutProfile(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=200)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='profile/', null=True, blank=True)
    stats_domain_count = models.IntegerField(default=12)
    stats_project_count = models.CharField(max_length=20, default='25+')
    stats_experience_years = models.CharField(max_length=20, default='5y+')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return self.name

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('technical', 'Technical'),
        ('soft', 'Soft'),
        ('domain', 'AI Domain'),
    ]
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    level = models.IntegerField(default=90) # 0-100

    class Meta:
        ordering = ['category', 'name']

    def __str__(self):
        return self.name

class Experience(models.Model):
    role = models.CharField(max_length=100) # Replaced title with role
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField()
    is_current = models.BooleanField(default=False)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.role} at {self.company}"

class Education(models.Model):
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=100, default='Computer Science')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True) # completion_date replaced
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['-end_date']

    def __str__(self):
        return f"{self.degree} from {self.institution}"
