import os
import django
import csv

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from app.knowledge.models import Domain
from app.projects.models import Project, ProjectCategory
from app.blog.models import Post, Category
from django.contrib.auth.models import User
from django.utils import timezone

def create_admin():
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'adminpass')
        print("Admin user created (admin/adminpass)")

def seed_knowledge():
    # Read Agentic_AI_Content_Architecture.csv
    with open('../Referances/Agentic_AI_Content_Architecture.csv', mode='r') as file:
        reader = csv.reader(file)
        lines = list(reader)
        
        icons = ['Brain', 'Network', 'MemoryStick', 'PenTool', 'Search', 'Settings', 'Eye', 'ShieldCheck', 'Zap', 'Workflow', 'Layers', 'Terminal']
        # Domains are in the "12 Domains" section
        # Start looking from line 68
        for i in range(67, 79):
            row = lines[i]
            if len(row) < 4: continue
            name = row[2]
            desc = row[3]
            concepts = [c.strip() for c in row[4].split(',')]
            
            Domain.objects.get_or_create(
                slug=name.lower().replace(' ', '-'),
                defaults={
                    'name': name,
                    'description': desc,
                    'key_concepts': concepts,
                    'order': i - 67,
                    'icon': icons[i-67] if i-67 < len(icons) else 'Brain'
                }
            )
        print("Knowledge Domains seeded.")

def seed_projects():
    # Basic categories
    cats = [
        {'name': 'Web', 'slug': 'web'},
        {'name': 'AI', 'slug': 'ai'},
        {'name': 'Mobile', 'slug': 'mobile'},
        {'name': 'Robotics', 'slug': 'robotics'}
    ]
    for cat_data in cats:
        ProjectCategory.objects.get_or_create(slug=cat_data['slug'], defaults={'name': cat_data['name']})
    
    # Static projects based on doc
    cat = ProjectCategory.objects.first()
    Project.objects.get_or_create(
        title="Agentic Workspace Creator",
        defaults={
            'short_description': "Autonomous environment setup for AI developers.",
            'description': "Full system for managing agentic lifecycles.",
            'category': cat,
            'tech_stack': ["Next.js", "Django", "Tailwind"],
            'is_featured': True
        }
    )
    print("Projects seeded.")

def seed_blog():
    admin = User.objects.get(username='admin')
    cat, _ = Category.objects.get_or_create(slug='architecture', defaults={'name': 'Architecture'})
    
    Post.objects.get_or_create(
        title="Foundations of Agentic AI",
        defaults={
            'author': admin,
            'category': cat,
            'content': "Full guide to agentic foundations...",
            'excerpt': "Baseline concepts for AI agents.",
            'published_at': timezone.now()
        }
    )
    print("Blog seeded.")

if __name__ == '__main__':
    create_admin()
    seed_knowledge()
    seed_projects()
    seed_blog()

