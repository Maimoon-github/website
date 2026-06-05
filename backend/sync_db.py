import os
import sys
import django
from django.core.management import execute_from_command_line

# Add backend to path
sys.path.append('/home/maimoon-nixos/Antigravity code/website/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'website.settings')
django.setup()

def run_migrations():
    print("Initializing Database Sync Protocol...")
    try:
        # Run migrations for projects app
        execute_from_command_line(['manage.py', 'makemigrations', 'projects'])
        execute_from_command_line(['manage.py', 'migrate', 'projects'])
        print("Database synchronization successful.")
    except Exception as e:
        print(f"Sync failed: {e}")

if __name__ == "__main__":
    run_migrations()
