import os
import django
import csv

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from knowledge.models import Domain, ContentSection, Subsection
from projects.models import Project, ProjectCategory
from blog.models import Post, Category
from django.contrib.auth.models import User

def seed_knowledge():
    # Read Agentic_AI_Content_Architecture.csv
    with open('../Referances/Agentic_AI_Content_Architecture.csv', mode='r') as file:
        reader = csv.reader(file)
        lines = list(reader)
        
        # Domains are in the "12 Domains" section
        # Start looking from line 68
        for i in range(67, 79):
            row = lines[i]
            if len(row) < 4: continue
            name = row[2]
            desc = row[3]
            concepts = [c.strip() for c in row[4].split(',')]
            
            Domain.objects.get_or_create(
                name=name,
                defaults={
                    'description': desc,
                    'key_concepts': concepts,
                    'order': i - 67
                }
            )
        print("Knowledge Domains seeded.")

def seed_projects():
    # Basic categories
    cats = ['Web', 'AI', 'Mobile', 'Robotics']
    for cat in cats:
        ProjectCategory.objects.get_or_create(name=cat)
    
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
    cat, _ = Category.objects.get_or_create(name='Architecture')
    
    Post.objects.get_or_create(
        title="Foundations of Agentic AI",
        defaults={
            'author': admin,
            'category': cat,
            'content': "Full guide to agentic foundations...",
            'excerpt': "Baseline concepts for AI agents.",
            'status': 'published',
            'published_at': django.utils.timezone.now()
        }
    )
    print("Blog seeded.")

if __name__ == '__main__':
    seed_knowledge()
    seed_projects()
    seed_blog()
