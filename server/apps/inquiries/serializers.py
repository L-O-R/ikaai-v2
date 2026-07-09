from rest_framework import serializers


class InquiryCreateSerializer(serializers.Serializer):
    """Validate public inquiry submissions."""

    name = serializers.CharField(max_length=150, trim_whitespace=True)
    email = serializers.EmailField()
    subject = serializers.CharField(max_length=200, trim_whitespace=True)
    message = serializers.CharField(trim_whitespace=True)

    def validate_name(self, value: str) -> str:
        if not value.strip():
            raise serializers.ValidationError("Name is required.")
        return value

    def validate_subject(self, value: str) -> str:
        if not value.strip():
            raise serializers.ValidationError("Subject is required.")
        return value

    def validate_message(self, value: str) -> str:
        if not value.strip():
            raise serializers.ValidationError("Message is required.")
        return value
