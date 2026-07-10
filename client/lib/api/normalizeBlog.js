import { resolveMediaUrl } from "./apiMedia";

export const normalizeBlog = (blog) => ({
  ...blog,
  featuredImage: resolveMediaUrl(blog.featured_image),
  ogImage: resolveMediaUrl(blog.og_image),
  categoryName: blog.category?.name || "",
  categorySlug: blog.category?.slug || "",
  related_blogs: (blog.related_blogs || []).map((item) => ({
    ...item,
    featuredImage: resolveMediaUrl(item.featured_image),
    categoryName: item.category?.name || "",
    categorySlug: item.category?.slug || "",
  })),
});

export const normalizeBlogPage = (page) => ({
  ...page,
  results: (page.results || []).map(normalizeBlog),
});
