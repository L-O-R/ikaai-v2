'use client';

import WorkHeader from '@/components/work/WorkHeader';
import WorkGrid from '@/components/work/WorkGrid';
import { getProjects } from '@/data/getProjects';
import { getErrorMessage } from '@/data/apiErrors';
import { useEffect, useMemo, useState } from 'react';

const ProjectsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [projects, setProjects] = useState([]);
    const [totalProjects, setTotalProjects] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const projectsPerPage = 8;

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
            <section className="bg-warm-beige pt-section-mobile pb-6 px-4 md:px-8">
                <div className="max-w-container-max mx-auto">
                    <div className="max-w-xl mb-12">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-text-muted text-xl">
                                    search
                                </span>
                            </span>
                            <input
                                type="text"
                                placeholder="Search by title, client, or location..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-neutral bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-body-md text-body-md text-on-surface placeholder:text-text-muted"
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <span className="font-body-md text-body-md text-text-muted">
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
        </main>
    );
};

export default ProjectsPage;
