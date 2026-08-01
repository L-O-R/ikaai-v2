import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectDetail } from '@/lib/api/getProjectDetail'
import { getProjects } from '@/lib/api/getProjects'

export const revalidate = 3600

export async function generateStaticParams() {
    return []
}

const MetaRow = ({ label, value }) => {
    if (!value) return null
    return (
        <div className="flex justify-between items-center py-5 border-b border-border-neutral last:border-b-0">
            <span className="font-sans text-body-sm text-text-muted font-normal">
                {label}
            </span>
            <span className="font-sans text-body-md text-on-surface font-semibold text-right max-w-[65%]">
                {value}
            </span>
        </div>
    )
}

const ProjectDetailPage = async ({ params }) => {
    const { slug } = await params

    let project
    try {
        project = await getProjectDetail(slug)
    } catch (error) {
        notFound()
    }

    if (!project) {
        notFound()
    }

    // Fetch other projects to showcase at the end (fallback to empty list if API fails)
    let otherProjects = []
    try {
        const allProjectsPage = await getProjects({ page_size: 4 })
        otherProjects = (allProjectsPage?.results || [])
            .filter((p) => p.slug !== slug)
            .slice(0, 2)
    } catch (error) {
        console.error("Failed to fetch other projects:", error)
    }

    const featuredImage = project.img || null
    const yearDisplay = project.endYear
        ? `${project.startYear}–${project.endYear}`
        : project.startYear ? `${project.startYear}` : null

    return (
        <main className="bg-surface">

            {/* Back Navigation */}
            <div className="bg-surface border-b border-border-neutral pt-section-mobile md:pt-section-desktop pb-0">
                <div className="container-size pb-6">
                    <Link href="/work" className="inline-flex items-center gap-2 text-body-sm font-sans text-text-muted hover:text-primary transition-colors duration-300">
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        <span>Back to projects</span>
                    </Link>
                </div>
            </div>

            {/* Title + Introduction + Details Section (Matching the mock design layout) */}
            <section className="bg-surface py-12 md:py-20">
                <div className="container-size">
                    
                    {/* Main Project Title */}
                    <h1 className="font-display text-display-lg text-on-surface font-bold tracking-tight mb-16 leading-tight max-w-5xl">
                        {project.title}
                    </h1>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                        
                        {/* Left Column: Introduction badge */}
                        <div className="lg:col-span-4">
                            <div className="inline-flex items-center gap-2 text-on-surface font-sans text-body-md font-semibold tracking-wider">
                                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-on-surface text-surface text-xs font-bold leading-none">+</span>
                                <span>Introduction</span>
                            </div>
                        </div>

                        {/* Right Column: Paragraph + Metadata Table + Logos */}
                        <div className="lg:col-span-8 flex flex-col gap-10">
                            
                            {/* Introduction text */}
                            {project.introduction && (
                                <p className="font-sans text-body-lg text-on-surface/90 leading-relaxed font-normal">
                                    {project.introduction}
                                </p>
                            )}

                            {/* Metadata Table */}
                            <div className="border-t border-border-neutral border-b border-border-neutral">
                                <MetaRow label="Year" value={yearDisplay} />
                                <MetaRow label="Industry" value={project.industry} />
                                <MetaRow label="Scope of work" value={project.scopeOfWork} />
                                <MetaRow label="Timeline" value={project.endYear && project.startYear ? `${(project.endYear - project.startYear || 1) * 12} Months` : null} />
                                <MetaRow label="Coverage" value={project.coverage} />
                                <MetaRow label="Sample Size" value={project.sampleSize} />
                            </div>

                            {/* Client logo / name */}
                            {project.client && (
                                <div className="flex items-center gap-4 mt-2">
                                    {project.clientLogo ? (
                                        <div className="relative w-24 h-16 bg-transparent flex items-center justify-start">
                                            <Image
                                                src={project.clientLogo}
                                                alt={project.client}
                                                width={96}
                                                height={48}
                                                className="object-contain filter grayscale contrast-125 opacity-85 hover:opacity-100 transition-all duration-300"
                                            />
                                        </div>
                                    ) : (
                                        <span className="font-sans text-body-sm font-semibold tracking-wide text-text-muted">
                                            {project.client}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image (rendered nicely below the top metadata block) */}
            {featuredImage && (
                <section className="bg-surface-container-low py-12">
                    <div className="container-size">
                        <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[600px] rounded-2xl overflow-hidden shadow-sm">
                            <Image
                                src={featuredImage}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1280px) 100vw, 1280px"
                                priority
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Project Statistics (Impact Numbers) */}
            {project.statistics && project.statistics.length > 0 && (
                <section className="bg-surface border-t border-border-neutral py-16 md:py-24">
                    <div className="container-size">
                        <span className="font-sans text-label-caps uppercase text-primary tracking-widest block mb-10 text-xs">
                            Impact Numbers
                        </span>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {project.statistics.map((stat, index) => (
                                <div key={index} className="bg-surface-container-low rounded-2xl p-6 border border-border-neutral hover-lift">
                                    <span className="material-symbols-outlined text-primary/70 block mb-3 text-3xl">
                                        {stat.material_symbol || 'trending_up'}
                                    </span>
                                    <span className="font-display text-3xl md:text-4xl font-bold text-primary block mb-2">
                                        {stat.value}
                                    </span>
                                    <span className="font-sans text-xs font-semibold text-text-muted uppercase tracking-wider">
                                        {stat.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Other Projects Showcase (Two different projects if available) */}
            {otherProjects && otherProjects.length > 0 && (
                <section className="bg-surface-container-low border-t border-border-neutral py-16 md:py-24">
                    <div className="container-size">
                        <span className="font-sans text-label-caps uppercase text-primary tracking-widest block mb-10 text-xs">
                            More Projects
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {otherProjects.map((proj) => (
                                <Link 
                                    key={proj.slug} 
                                    href={`/work/${proj.slug}`}
                                    className="group flex flex-col bg-surface rounded-2xl overflow-hidden border border-border-neutral hover-lift transition-all duration-300"
                                >
                                    {proj.img && (
                                        <div className="relative w-full h-48 sm:h-64 overflow-hidden">
                                            <Image
                                                src={proj.img}
                                                alt={proj.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6 md:p-8 flex flex-col flex-1">
                                        {proj.industry && (
                                            <span className="font-sans text-label-caps text-xs text-primary uppercase tracking-wider mb-2 block">
                                                {proj.industry}
                                            </span>
                                        )}
                                        <h3 className="font-display text-headline-sm text-on-surface group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-3">
                                            {proj.title}
                                        </h3>
                                        {proj.introduction && (
                                            <p className="font-sans text-body-sm text-text-muted line-clamp-3 mb-6">
                                                {proj.introduction}
                                            </p>
                                        )}
                                        <div className="mt-auto flex items-center gap-2 text-primary font-sans text-body-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">
                                            <span>View Project</span>
                                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Call to Action */}
            <section className="py-16 md:py-24 bg-primary text-white text-center">
                <div className="container-size">
                    <h3 className="font-display text-headline-md text-white mb-4">
                        Interested in Similar Research?
                    </h3>
                    <p className="font-sans text-white/80 max-w-2xl mx-auto mb-8">
                        Let's discuss how we can help you with your research and assessment needs.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-sans text-label-caps uppercase rounded-xl hover:bg-warm-beige transition-colors shadow-lg"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default ProjectDetailPage