import Link from "next/link";
import ProjectCard from "../ui/ProjectCard";

const loadingCards = [
  "project-loading-1",
  "project-loading-2",
  "project-loading-3",
  "project-loading-4",
  "project-loading-5",
  "project-loading-6",
  "project-loading-7",
  "project-loading-8",
];

const WorkGrid = ({
  currentProjects,
  totalPages,
  currentPage,
  goToPage,
  pageNumbers,
  clearSearch,
  isLoading,
  error,
}) => {
  return (
    <section className="bg-warm-beige ">
      <div className="pb-section-mobile lg:pb-section-desktop container mx-auto ">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
            {loadingCards.map((item) => (
              <div key={item} className="space-y-2">
                <div className="h-16 rounded-2xl bg-surface-container-high animate-pulse" />
                <div className="aspect-4/3 rounded-2xl bg-surface-container-high animate-pulse" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-error block mb-4">
              error
            </span>
            <p className="font-body-lg text-body-lg text-text-secondary">
              {error}
            </p>
          </div>
        ) : currentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
            {currentProjects.map((project) => (
              <Link href={`/work/${project.slug}`} key={project.id}>
                <ProjectCard project={project} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-text-muted block mb-4">
              search_off
            </span>
            <p className="font-body-lg text-body-lg text-text-secondary">
              No projects found matching your search.
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="mt-4 font-label-caps text-label-caps uppercase text-primary hover:text-primary/80 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            {/* Previous Button */}
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl border border-border-neutral font-label-caps text-label-caps transition-all duration-300 flex items-center gap-1 ${currentPage === 1
                ? "opacity-40 cursor-not-allowed text-text-muted"
                : "hover:bg-primary hover:text-on-primary hover:border-primary text-on-surface"
                }`}
            >
              <span className="material-symbols-outlined text-sm">
                chevron_left
              </span>
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1.5">
              {pageNumbers.map((pageNum) => (
                <button
                  type="button"
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-10 h-10 rounded-full font-body-md text-body-md transition-all duration-300 ${currentPage === pageNum
                    ? "bg-primary text-on-primary shadow-md"
                    : "text-on-surface hover:bg-surface-container-high"
                    }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-xl border border-border-neutral font-label-caps text-label-caps transition-all duration-300 flex items-center gap-1 ${currentPage === totalPages
                ? "opacity-40 cursor-not-allowed text-text-muted"
                : "hover:bg-primary hover:text-on-primary hover:border-primary text-on-surface"
                }`}
            >
              Next
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkGrid;
