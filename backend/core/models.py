from django.db import models

class AboutProfile(models.Model):
    bio = models.TextField()
    profile_photo = models.ImageField(upload_to='profile/', null=True, blank=True)
    resume_file = models.FileField(upload_to='resumes/', null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField()
    github = models.URLField(null=True, blank=True)
    linkedin = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"Profile - {self.email}"

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('ai_ml', 'AI/ML'),
        ('devops', 'DevOps'),
        ('other', 'Other'),
    ]
    name = models.CharField(max_length=100)
    proficiency_percent = models.IntegerField(default=80)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class Experience(models.Model):
    company = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField()
    is_current = models.BooleanField(default=False)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.role} at {self.company}"

class Education(models.Model):
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    field = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.degree} from {self.institution}"
