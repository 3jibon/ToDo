#!/usr/bin/env python
"""
Django's command-line utility for administrative tasks.
"""

import os
import sys


def main():
    """Run administrative tasks."""
    # Set the default settings module for Django
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "todo.settings")
    
    # Check if the settings module exists
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Ensure it's installed and available "
            "on your PYTHONPATH environment variable. Did you forget to "
            "activate a virtual environment?"
        ) from exc

    # Check for required environment variables like PORT
    required_env_vars = ["PORT"]
    missing_vars = [var for var in required_env_vars if os.getenv(var) is None]
    if missing_vars:
        raise RuntimeError(
            f"The following required environment variables are missing: {', '.join(missing_vars)}"
        )

    # Log the starting command for debugging
    print("Starting Django with the following arguments:", sys.argv)

    # Execute Django command-line tasks
    try:
        execute_from_command_line(sys.argv)
    except Exception as e:
        print(f"Error occurred: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
