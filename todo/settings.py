import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Secure settings from environment variables
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'your-secret-key')  # Replace 'your-secret-key' with a fallback for dev
DEBUG = os.getenv('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '127.0.0.1,localhost,todo-production-42b9.up.railway.app').split(',')

INSTALLED_APPS = [
    "app.apps.AppConfig",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",  # Add CORS headers support
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # Ensure CORS support
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",  # Path to SQLite database
    }
}

# Email Configuration (Ensure to fill these fields)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_USER', '')  # Use environment variables for email user
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_PASS', '')  # Use environment variables for email password

# Static files (CSS, JavaScript, images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    'https://todo-production-42b9.up.railway.app',  # Allowed domain for CORS
]

CSRF_TRUSTED_ORIGINS = [
    'https://todo-production-42b9.up.railway.app',  # Trusted origins for CSRF protection
]

# Templates Configuration (Ensure the admin works)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Path to your templates directory
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# The time zone and language settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Default auto field configuration
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
