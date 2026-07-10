"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getUpdates } from "@/lib/api/getUpdates";

const fallbackImage = "/updates/outline-india.jpg";

const UpdateCard = ({ update }) => (
  <Link
    href={update.link}
    target="_blank"
    rel="noopener noreferrer"
    className="block h-full"
  >
    <div className="relative group h-full bg-surface-container-low rounded-2xl overflow-hidden border border-border-neutral hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-4/3 relative overflow-hidden bg-surface-container-high">
        <Image
          width={400}
          height={300}
          src={update.image || fallbackImage}
          alt={update.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 min-h-32">
        <h3 className="font-headline-md text-xl text-on-surface group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {update.title.split(" ").length > 5
            ? `${update.title.substring(0, 50)}...`
            : update.title}
        </h3>
      </div>

      <span className="absolute bottom-3 right-3 bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full group-hover:block hidden">
        Read More
      </span>
    </div>
  </Link>
);

const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const carouselRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadUpdates = async () => {
      try {
        const data = await getUpdates();
        if (isMounted) {
          setUpdates(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load updates.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadUpdates();

    return () => {
      isMounted = false;
    };
  }, []);

  const shouldUseCarousel = updates.length > 4;

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const scrollAmount = carouselRef.current.clientWidth * 0.8;
    carouselRef.current.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  if (!isLoading && !error && updates.length === 0) {
    return null;
  }

  return (
    <section
      className="py-section-mobile md:py-section-desktop  bg-surface"
      id="updates-section"
    >
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
            Updates
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            From Ikaai India
          </h2>
          <p className="font-body-md text-body-md text-text-secondary max-w-xl mt-4">
            Stay connected with our latest news, events, and impact stories.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 rounded-2xl bg-surface-container-low border border-border-neutral animate-pulse"
              />
            ))}
          </div>
        )}

        {error && (
          <p className="font-body-md text-body-md text-text-secondary">
            {error}
          </p>
        )}

        {!isLoading && !error && !shouldUseCarousel && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {updates.map((update) => (
              <UpdateCard
                key={`${update.title}-${update.link}`}
                update={update}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && shouldUseCarousel && (
          <div className="relative">
            <section
              ref={carouselRef}
              className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Latest updates carousel"
            >
              {updates.map((update) => (
                <div
                  key={`${update.title}-${update.link}`}
                  className="snap-start shrink-0 w-[82%] sm:w-[48%] lg:w-[23.5%]"
                >
                  <UpdateCard update={update} />
                </div>
              ))}
            </section>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => scrollCarousel("previous")}
                className="h-10 w-10 rounded-full border border-border-neutral bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors"
                aria-label="Previous updates"
              >
                <span aria-hidden="true">{"<"}</span>
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel("next")}
                className="h-10 w-10 rounded-full border border-border-neutral bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors"
                aria-label="Next updates"
              >
                <span aria-hidden="true">{">"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Updates;
