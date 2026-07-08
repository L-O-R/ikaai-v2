from django.conf import settings

from .oauth import oauth

GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"
GOOGLE_SCOPE = "openid email profile"

oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url=GOOGLE_DISCOVERY_URL,
    client_kwargs={
        "scope": GOOGLE_SCOPE,
    },
)


def authorize_google_redirect(request):
    """Redirect the request to Google's OAuth consent page."""
    return oauth.google.authorize_redirect(
        request,
        settings.GOOGLE_REDIRECT_URI,
    )


def fetch_google_profile(request) -> dict:
    """Return the authenticated Google OpenID profile."""
    token = oauth.google.authorize_access_token(request)
    profile = token.get("userinfo")

    if profile is None:
        profile = oauth.google.parse_id_token(request, token)

    return dict(profile)
