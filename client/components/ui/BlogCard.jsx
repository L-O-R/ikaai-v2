import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }) => (
    <Link
        href={`/stories/${blog.slug}`}
        className="group block h-full overflow-hidden rounded-2xl border border-border-neutral bg-surface-container-low transition-shadow duration-300 hover:shadow-lg"
    >
        <div className="relative aspect-4/3 overflow-hidden bg-surface-container-high">
            {blog.featuredImage && (
                <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
            )}
        </div>
        <div className="p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {blog.categoryName && <span>{blog.categoryName}</span>}
                <span>{blog.reading_time} min read</span>
            </div>
            <h2 className="font-headline-md text-xl text-on-surface transition-colors duration-300 group-hover:text-primary">
                {blog.title}
            </h2>
            <p className="mt-3 line-clamp-3 font-body-md text-body-md text-text-secondary">
                {blog.excerpt}
            </p>
        </div>
    </Link>
);
export default BlogCard;