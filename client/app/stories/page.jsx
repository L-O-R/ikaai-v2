"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getErrorMessage } from "@/lib/api/apiErrors";
import { getBlogs } from "@/lib/api/getBlogs";
import BlogCard from "@/components/ui/BlogCard";
import PageHero from "@/components/ui/PageHero";
import { heroData } from "@/lib/data/heroData";

const blogsPerPage = 9;
const loadingCards = [
  "story-loading-1",
  "story-loading-2",
  "story-loading-3",
  "story-loading-4",
  "story-loading-5",
  "story-loading-6",
];


const StoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setCurrentPage(1);
    }, 350);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError("");

    getBlogs({
      page: currentPage,
      page_size: blogsPerPage,
      search: debouncedSearch || undefined,
    })
      .then((data) => {
        if (!isMounted) return;
        setBlogs(data.results || []);
        setTotalBlogs(data.count || 0);
      })
      .catch((err) => {
        if (!isMounted) return;
        setBlogs([]);
        setTotalBlogs(0);
        setError(getErrorMessage(err, "Unable to load stories."));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage, debouncedSearch]);

  const totalPages = Math.max(1, Math.ceil(totalBlogs / blogsPerPage));
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  return (
    <main className="bg-surface">
      <PageHero {...heroData.stories} />

      <section className="bg-warm-beige py-8">
        <div className="container mx-auto">
          <div className="relative max-w-xl">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-muted text-xl">
                search
              </span>
            </span>
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-neutral bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-body-md text-body-md text-on-surface placeholder:text-text-muted"
            />
          </div>
        </div>
      </section>

      <section className="py-section-mobile md:py-section-desktop">
        <div className="container mx-auto">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {loadingCards.map((key) => (
                <div
                  key={key}
                  className="h-96 rounded-2xl border border-border-neutral bg-surface-container-low animate-pulse"
                />
              ))}
            </div>
          )}

          {!isLoading && error && (
            <p className="font-body-md text-body-md text-text-secondary">
              {error}
            </p>
          )}

          {!isLoading && !error && blogs.length === 0 && (
            <p className="font-body-md text-body-md text-text-secondary">
              No stories found.
            </p>
          )}

          {!isLoading && !error && blogs.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog.slug} blog={blog} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex flex-wrap justify-center gap-2">
                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-10 min-w-10 rounded-full border px-4 font-body-md text-body-sm transition-colors ${currentPage === page
                        ? "border-primary bg-primary text-white"
                        : "border-border-neutral bg-surface-container-low text-on-surface hover:bg-surface-container-high"
                        }`}
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default StoriesPage;
