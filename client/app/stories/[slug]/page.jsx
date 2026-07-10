import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getBlogDetail } from "@/lib/api/getBlogDetail";

export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="mt-12 mb-4 font-headline-lg text-headline-lg text-on-surface">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 font-headline-md text-headline-md text-on-surface">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-headline-sm text-headline-sm text-on-surface">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 font-body-md text-body-md leading-relaxed text-on-surface/80">
      {children}
    </p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 list-disc pl-6 font-body-md text-body-md text-on-surface/80 space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal pl-6 font-body-md text-body-md text-on-surface/80 space-y-1">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-primary pl-5 text-on-surface/80 font-body-md text-body-md italic">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-sm text-primary">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-xl bg-surface-container-low p-4 border border-border-neutral">
      {children}
    </pre>
  ),
};

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const blog = await getBlogDetail(slug);
    return {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt,
      alternates: blog.canonical_url
        ? {
          canonical: blog.canonical_url,
        }
        : undefined,
      openGraph: {
        title: blog.meta_title || blog.title,
        description: blog.meta_description || blog.excerpt,
        images:
          blog.ogImage || blog.featuredImage
            ? [blog.ogImage || blog.featuredImage]
            : [],
      },
    };
  } catch {
    return {};
  }
}

const BlogDetailPage = async ({ params }) => {
  const { slug } = await params;

  let blog;
  try {
    blog = await getBlogDetail(slug);
  } catch {
    notFound();
  }

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-section-mobile md:pt-section-desktop pb-10 border-b border-border-neutral">
        <div className="container mx-auto">
          {/* Back link */}
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 font-body-md text-body-md text-text-secondary hover:text-primary transition-colors mb-6"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to stories</span>
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-label-caps font-label-caps uppercase text-text-muted">
            {blog.categoryName && <span>{blog.categoryName}</span>}
            {blog.author && <span>• {blog.author}</span>}
            <span>• {blog.reading_time} min read</span>
          </div>

          {/* Title */}
          <h1 className="font-headline-lg text-headline-lg text-on-surface max-w-4xl mt-4">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="mt-4 max-w-3xl font-body-lg text-body-lg text-text-secondary leading-relaxed">
              {blog.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {blog.featuredImage && (
        <section className="py-10">
          <div className="container mx-auto">
            <div className="relative h-72 md:h-[480px] rounded-2xl overflow-hidden shadow-lg border border-border-neutral bg-surface-container-low">
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-section-mobile md:pb-section-desktop">
        <article className="container mx-auto">
          <ReactMarkdown components={markdownComponents}>
            {blog.content}
          </ReactMarkdown>
        </article>
      </section>

      {/* Related Blogs */}
      {blog.related_blogs?.length > 0 && (
        <section className="border-t border-border-neutral py-section-mobile md:py-section-desktop bg-surface-container-low">
          <div className="container mx-auto">
            <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
              Related
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-8">
              More stories
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blog.related_blogs.map((related) => (
                <Link
                  key={related.slug}
                  href={`/stories/${related.slug}`}
                  className="group rounded-2xl border border-border-neutral bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-wider">
                    {related.categoryName || "Story"}
                  </span>
                  <h3 className="mt-3 font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 font-body-md text-body-md text-text-secondary leading-relaxed">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogDetailPage;