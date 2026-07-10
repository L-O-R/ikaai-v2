import environ
from pathlib import Path

from common.design_tokens import (
    ADMIN_BRANDING,
    FRONTEND_COLORS,
    FRONTEND_RADIUS,
)

BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env()

environ.Env.read_env(str(BASE_DIR / '.env'))

SECRET_KEY = env("SECRET_KEY")

DEBUG = env.bool("DEBUG", default=False)

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

CORS_ALLOWED_ORIGINS = env.list(
    "CORS_ALLOWED_ORIGINS",
    default=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
)
CORS_URLS_REGEX = r"^/api/.*$"

CSRF_TRUSTED_ORIGINS = env.list(
    "CSRF_TRUSTED_ORIGINS",
    default=CORS_ALLOWED_ORIGINS,
)



INSTALLED_APPS = [
    # Third Party Admin
    "unfold",

    # Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third Party
    "rest_framework",
    "drf_spectacular",
    "corsheaders",
    "django_filters",
    "django_extensions",

    # Local Apps
    'apps.accounts',
    'apps.statistics',
    'apps.clients',
    'apps.projects',
    'apps.inquiries',
    'apps.updates',
    'apps.blogs',
    'apps.jobs',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

AUTH_USER_MODEL = "accounts.User"

GOOGLE_CLIENT_ID = env("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = env("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = env("GOOGLE_REDIRECT_URI")

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

SPECTACULAR_SETTINGS = {
    "TITLE": "IKAAI INDIA CMS API",
    "DESCRIPTION": "API documentation for the IKAAI INDIA CMS.",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}


EMAIL_BACKEND = env(
    "EMAIL_BACKEND",
    default="django.core.mail.backends.console.EmailBackend",
)
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL", default="webmaster@localhost")
CONTACT_NOTIFICATION_EMAIL = env("CONTACT_NOTIFICATION_EMAIL", default="")
EMAIL_HOST = env("EMAIL_HOST", default="")
EMAIL_PORT = env.int("EMAIL_PORT", default=587)
EMAIL_HOST_USER = env("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD", default="")
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", default=True)
EMAIL_USE_SSL = env.bool("EMAIL_USE_SSL", default=False)

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        "DIRS": [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATIC_URL = "static/"

STATICFILES_DIRS = [
    BASE_DIR / "static",
]

STATIC_ROOT = BASE_DIR / "staticfiles"

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

MEDIA_URL = "/media/"

MEDIA_ROOT = env.path("MEDIA_ROOT", default=BASE_DIR/"media")

WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "PASSWORD": env("DB_PASSWORD"),
        "HOST": env("DB_HOST"),
        "PORT": env("DB_PORT"),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_TZ = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

UNFOLD = {
    "SITE_TITLE": env("ADMIN_SITE_TITLE", default=ADMIN_BRANDING["title"]),
    "SITE_HEADER": env("ADMIN_SITE_HEADER", default=ADMIN_BRANDING["header"]),
    "SITE_SUBHEADER": env(
        "ADMIN_SITE_SUBHEADER", default=ADMIN_BRANDING["subheader"]
    ),
    "SITE_URL": env("FRONTEND_LINK", default="http://localhost:3000"),
    "SITE_LOGO": {
        "light": "/static/admin/images/logo-light.png",
        "dark": "/static/admin/images/logo-light.png",
    },
    "SITE_FAVICONS": [
        {
            "href": "/static/admin/images/favicon.svg",
            "rel": "icon",
            "type": "image/svg+xml",
        },
    ],
    "BORDER_RADIUS": FRONTEND_RADIUS["lg"],
    "COLORS": {
        "base": {
            "50": FRONTEND_COLORS["base_50"],
            "100": FRONTEND_COLORS["base_100"],
            "200": FRONTEND_COLORS["base_200"],
            "300": FRONTEND_COLORS["base_300"],
            "400": FRONTEND_COLORS["base_400"],
            "500": FRONTEND_COLORS["base_500"],
            "700": FRONTEND_COLORS["base_700"],
            "800": FRONTEND_COLORS["base_800"],
            "900": FRONTEND_COLORS["base_900"],
        },
        "primary": {
            "50": FRONTEND_COLORS["primary_50"],
            "100": FRONTEND_COLORS["primary_100"],
            "200": FRONTEND_COLORS["primary_200"],
            "600": FRONTEND_COLORS["primary_600"],
            "700": FRONTEND_COLORS["primary_700"],
        },
        "font": {
            "default-light": FRONTEND_COLORS["font_default_light"],
            "important-light": FRONTEND_COLORS["font_important_light"],
            "default-dark": FRONTEND_COLORS["font_default_dark"],
            "important-dark": FRONTEND_COLORS["font_important_dark"],
        },
    },
    "FORMS": {
        "classes": {
            "prose": "font-normal whitespace-normal prose-sm prose-a:text-link prose-blockquote:border-l-4 prose-blockquote:not-italic prose-pre:bg-base-50 prose-pre:rounded-default prose-headings:font-semibold prose-headings:text-important prose-headings:tracking-tight prose-strong:font-semibold prose-ol:list-decimal prose-ol:flex prose-ol:flex-col prose-ol:gap-0.5 prose-ol:mt-2 prose-ul:list-disc prose-ul:flex prose-ul:flex-col prose-ul:gap-0.5 prose-ul:mt-2 prose-li:m-0 dark:prose-pre:bg-base-800 dark:prose-blockquote:border-base-700 dark:prose-blockquote:text-base-300",
            "text_input": "border border-base-200 bg-white font-medium min-w-20 placeholder-base-400 rounded-default shadow-xs text-font-default-light text-sm focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 group-[.errors]:border-red-600 focus:group-[.errors]:outline-red-600 dark:bg-base-900 dark:border-base-700 dark:text-font-default-dark dark:group-[.errors]:border-red-500 dark:focus:group-[.errors]:outline-red-500 dark:scheme-dark group-[.primary]:border-transparent disabled:!bg-base-50 dark:disabled:!bg-base-800 px-3 py-2 w-full max-w-2xl",
            "checkbox": "appearance-none bg-white block border border-base-300 h-4 min-w-4 relative rounded-[4px] shadow-xs w-4 dark:bg-base-900 dark:border-base-700 dark:checked:after:text-white after:absolute after:content-['check\\_small'] after:flex! after:h-4 after:items-center after:justify-center after:leading-none after:material-symbols-outlined after:-ml-px after:-mt-px after:text-white after:w-4 dark:after:text-transparent checked:bg-primary-600 dark:checked:bg-primary-600 checked:border-primary-600 dark:checked:border-primary-600",
            "button": "border cursor-pointer font-medium px-3 py-2 rounded-default text-center whitespace-nowrap bg-primary-600 border-transparent text-white",
            "radio": "appearance-none bg-white block border border-base-300 h-4 min-w-4 relative rounded-full w-4 dark:bg-base-900 dark:border-base-700 after:absolute after:bg-transparent after:content-[''] after:flex after:h-2 after:items-center after:justify-center after:leading-none after:left-1/2 after:rounded-full after:text-white after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-2 dark:after:text-base-700 dark:after:bg-transparent checked:bg-primary-600 checked:border-primary-600 checked:after:bg-white dark:checked:after:bg-base-900",
            "switch": "appearance-none bg-base-300 block cursor-pointer h-5 relative rounded-full w-8 min-w-8 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none after:absolute after:bg-white after:content-[''] after:bg-red-300 after:h-3 after:rounded-full after:shadow-xs after:transition-all after:left-1 after:top-1 after:w-3 checked:bg-green-500 checked:after:left-4 dark:bg-base-600",
            "file": "border border-base-200 bg-white font-medium min-w-20 placeholder-base-400 rounded-default shadow-xs text-font-default-light text-sm focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 group-[.errors]:border-red-600 focus:group-[.errors]:outline-red-600 dark:bg-base-900 dark:border-base-700 dark:text-font-default-dark dark:group-[.errors]:border-red-500 dark:focus:group-[.errors]:outline-red-500 dark:scheme-dark group-[.primary]:border-transparent disabled:!bg-base-50 dark:disabled:!bg-base-800 px-3 py-2 w-full max-w-2xl",
        },
    },
    "STYLES": [
        "/static/admin/css/admin.css",
    ],
    "LOGIN": {
        "image": {
            "light": "/static/admin/images/logo-light.png",
            "dark": "/static/admin/images/logo-light.png",
        },
    },
}
