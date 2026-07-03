import React from 'react'
import ProjectCard from '../ui/ProjectCard';

const WorkGrid = ({
    currentProjects,
    totalPages,
    currentPage,
    goToPage,
    pageNumbers,
    setSearchTerm,
    setCurrentPage
}) => {
    return (
        <section className='bg-warm-beige '>
            <div className='pb-section-mobile lg:pb-section-desktop max-w-container-max mx-auto'>
                {/* Grid */}
                {currentProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
                        {currentProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
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
                            onClick={() => {




                                setSearchTerm('');
                                setCurrentPage(1);
                            }}
                            className="mt-4 font-label-caps text-label-caps uppercase text-primary hover:text-primary/80 transition-colors"
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-8">
                        {/* Previous Button */}
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-xl border border-border-neutral font-label-caps text-label-caps transition-all duration-300 flex items-center gap-1 ${currentPage === 1
                                ? 'opacity-40 cursor-not-allowed text-text-muted'
                                : 'hover:bg-primary hover:text-white hover:border-primary text-on-surface'
                                }`}
                        >
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                            Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1.5">
                            {pageNumbers.map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => goToPage(pageNum)}
                                    className={`w-10 h-10 rounded-full font-body-md text-body-md transition-all duration-300 ${currentPage === pageNum
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-on-surface hover:bg-surface-container-high'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-xl border border-border-neutral font-label-caps text-label-caps transition-all duration-300 flex items-center gap-1 ${currentPage === totalPages
                                ? 'opacity-40 cursor-not-allowed text-text-muted'
                                : 'hover:bg-primary hover:text-white hover:border-primary text-on-surface'
                                }`}
                        >
                            Next
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default WorkGrid