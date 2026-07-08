'use client';

import React, { useState, useMemo } from 'react';
import { projectsData } from '@/data/project';
import ProjectCard from '@/components/ui/ProjectCard';
import WorkHeader from '@/components/work/WorkHeader';
import WorkGrid from '@/components/work/WorkGrid';

const ProjectsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 8;


    const filteredProjects = useMemo(() => {
        if (!searchTerm.trim()) {
            return projectsData;
        }
        const term = searchTerm.toLowerCase().trim();
        return projectsData.filter(
            (project) =>
                project.title.toLowerCase().includes(term) ||
                project.location.toLowerCase().includes(term)
        );
    }, [searchTerm]);


    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <main className="bg-surface ">
            {/* Header */}
            <WorkHeader />
            <section className='bg-warm-beige pt-section-mobile pb-6 '>
                <div className='max-w-container-max mx-auto'>
                    {/* Search Bar */}
                    <div className="max-w-xl mb-12">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-text-muted text-xl">
                                    search
                                </span>
                            </span>
                            <input
                                type="text"
                                placeholder="Search by title or location..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border-neutral bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-body-md text-body-md text-on-surface placeholder:text-text-muted"
                            />
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="text-center">
                        <span className="font-body-md text-body-md text-text-muted">
                            Showing {currentProjects.length} of {filteredProjects.length} projects
                        </span>
                    </div>
                </div>
            </section>
            {/* Grid */}
            <WorkGrid
                currentProjects={currentProjects}
                totalPages={totalPages}
                currentPage={currentPage}
                goToPage={goToPage}
                pageNumbers={pageNumbers}
                searchTerm={searchTerm}
                setSearchTerm={handleSearchChange}
                setCurrentPage={setCurrentPage}
            />
        </main>
    );
};

export default ProjectsPage;