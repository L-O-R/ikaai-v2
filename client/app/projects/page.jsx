'use client';


import { getProjects } from '@/lib/api/getProjects';
import { getOtherProjects } from '@/lib/api/getOtherProjects';
import { getErrorMessage } from '@/lib/api/apiErrors';
import { useEffect, useMemo, useState } from 'react';
import WorkGrid from '@/components/projects/WorkGrid';
import WorkHeader from '@/components/projects/WorkHeader';

const ProjectsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [projects, setProjects] = useState([]);
    const [totalProjects, setTotalProjects] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const projectsPerPage = 8;

    // Other projects state
    const [otherProjects, setOtherProjects] = useState([]);
    const [hasOtherProjects, setHasOtherProjects] = useState(false);
    const [showOther, setShowOther] = useState(false);
    const [isLoadingOther, setIsLoadingOther] = useState(true);

    useEffect(() => {
        let isMounted = true;
        getOtherProjects()
            .then((data) => {
                if (!isMounted) return;
                const items = Array.isArray(data) ? data : [];
                setOtherProjects(items);
                setHasOtherProjects(items.length > 0);
            })
            .catch(() => {
                if (!isMounted) return;
                setOtherProjects([]);
                setHasOtherProjects(false);
            })
            .finally(() => {
                if (isMounted) setIsLoadingOther(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

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
        setError('');

        getProjects({
            page: currentPage,
            page_size: projectsPerPage,
            search: debouncedSearch || undefined,
        })
            .then((data) => {
                if (!isMounted) return;
                setProjects(data.results || []);
                setTotalProjects(data.count || 0);
            })
            .catch((err) => {
                if (!isMounted) return;
                setProjects([]);
                setTotalProjects(0);
                setError(getErrorMessage(err, 'Unable to load projects.'));
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [currentPage, debouncedSearch]);

    const handleViewMore = () => {
        setShowOther(true);
    };

    const totalPages = Math.max(1, Math.ceil(totalProjects / projectsPerPage));
    const pageNumbers = useMemo(
        () => Array.from({ length: totalPages }, (_, index) => index + 1),
        [totalPages]
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setDebouncedSearch('');
        setCurrentPage(1);
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <main className="bg-surface">
            <WorkHeader />
            <section className="bg-warm-beige pt-section-mobile pb-6 ">
                <div className="container-size">
                    <div className="max-w-xl mb-12">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-text-muted text-xl">
                                    search
                                </span>
                            </span>
                            <input
                                type="text"
                                placeholder="Search by title or client..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-neutral bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-sans text-body-md text-on-surface placeholder:text-text-muted"
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <span className="font-sans text-body-md text-text-muted">
                            {isLoading
                                ? 'Loading projects...'
                                : `Showing ${projects.length} of ${totalProjects} projects`}
                        </span>
                    </div>
                </div>
            </section>
            <WorkGrid
                currentProjects={projects}
                totalPages={totalPages}
                currentPage={currentPage}
                goToPage={goToPage}
                pageNumbers={pageNumbers}
                searchTerm={searchTerm}
                clearSearch={clearSearch}
                isLoading={isLoading}
                error={error}
            />

            {/* View More / Other Projects - ONLY shown if other projects exist */}
            {!isLoading && !error && !showOther && hasOtherProjects && (
                <section className="bg-warm-beige pb-section-mobile md:pb-section-desktop">
                    <div className="container-size flex justify-center">
                        <button
                            type="button"
                            onClick={handleViewMore}
                            className="inline-flex items-center gap-2 border border-border-neutral/80 rounded-full px-8 py-3 font-sans text-body-md text-on-surface hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                        >
                            View More Projects
                            <span className="material-symbols-outlined text-base">expand_more</span>
                        </button>
                    </div>
                </section>
            )}

            {showOther && hasOtherProjects && (
                <section className="bg-warm-beige pb-section-mobile md:pb-section-desktop">
                    <div className="container-size">
                        {isLoadingOther ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map((n) => (
                                    <div key={n} className="h-44 rounded-2xl bg-surface-container animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                                {otherProjects.map((project) => (
                                    <div
                                        key={project.id || project.title}
                                        className="group relative overflow-hidden rounded-xl p-8 md:p-9 bg-surface border border-border-neutral/60 transition-all duration-500 ease-out flex flex-col justify-between h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] "
                                    >
                                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />


                                        <div className="space-y-3 relative z-10 mb-8">
                                            <h3 className="font-display text-headline-sm font-bold text-on-surface leading-snug tracking-tight group-hover:text-primary transition-colors duration-300">
                                                {project.title}
                                            </h3>

                                        </div>

                                        <div className="relative z-10 mt-auto pt-6  transition-colors duration-300">
                                            <p className="font-sans text-body-sm font-semibold tracking-tight mb-4 text-text-muted transition-colors duration-300 ">
                                                Sector — {project.section}
                                            </p>
                                            <p className="font-sans text-body-md text-text-secondary/90 leading-relaxed line-clamp-4">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </main>
    );
};

export default ProjectsPage;
