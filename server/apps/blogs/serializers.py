from rest_framework import serializers

from .models import Blog, BlogCategory
from .selectors import get_related_blogs


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = (
            "name",
            "slug",
        )


class BlogListSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    author = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = (
            "title",
            "slug",
            "excerpt",
            "featured_image",
            "category",
            "author",
            "reading_time",
            "published_at",
            "featured",
        )

    def get_author(self, obj) -> str | None:
        if not obj.author:
            return None
        full_name = obj.author.get_full_name()
        return full_name or obj.author.email


class RelatedBlogSerializer(BlogListSerializer):
    pass


class BlogDetailSerializer(BlogListSerializer):
    related_blogs = serializers.SerializerMethodField()

    class Meta(BlogListSerializer.Meta):
        fields = BlogListSerializer.Meta.fields + (
            "content",
            "meta_title",
            "meta_description",
            "og_image",
            "canonical_url",
            "related_blogs",
        )

    def get_related_blogs(self, obj):
        return RelatedBlogSerializer(get_related_blogs(obj), many=True).data
