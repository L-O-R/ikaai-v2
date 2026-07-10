import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectDetail } from '@/lib/api/getProjectDetail'
import ProjectCarousel from '@/components/work/ProjectCarousel'
export const revalidate = 3600

export async function generateStaticParams() {
    return []
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

    const mainImage = project.img || project.cover_image || (project.gallery?.[0]?.image) || null
    const hasGallery = project.gallery && project.gallery.length > 0

    return (
        <main className="bg-surface">
            {/* Header / Meta Navigation Title */}
            <section className="pt-section-mobile md:pt-section-desktop bg-surface border-b border-border-neutral">
                <div className="container">
                    <div className='flex justify-between items-center mb-4'>
                        <div className='flex items-center gap-2'>
                            <Link href="/work" className="flex items-center gap-2 text-body-sm font-body-lg hover:text-primary transition-colors duration-300">
                                <span className="material-symbols-outlined">arrow_back</span>
                                <span>Back to work</span>
                            </Link>
                        </div>
                    </div>
                    {project.location && (
                        <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mb-3">
                            {project.location}
                        </span>
                    )}
                    <h1 className="font-headline-lg text-headline-lg text-on-surface">
                        {project.title}
                    </h1>
                </div>
            </section>

            {/* Description Block */}
            {project.description && (
                <section className="bg-surface border-b border-border-neutral py-16 space-y-12">
                    <div className="container mx-auto ">
                        <p className="font-body-lg text-body-lg text-on-surface/80 leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                    {project.statistics && project.statistics.length > 0 && (
                        <div className='container'>
                            <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mb-3">
                                Impact Numbers
                            </span>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {project.statistics.map((stat, index) => (
                                    <div key={index} className="bg-surface-container-low rounded-xl p-3 border border-border-neutral">
                                        <span className="material-symbols-outlined text-primary/60 block mb-0.5">
                                            {stat.material_symbol || 'trending_up'}
                                        </span>
                                        <span className="font-statistic-num text-headline-sm font-bold text-primary block">
                                            {stat.value}
                                        </span>
                                        <span className="font-label-caps text-sm font-semibold text-text-muted">
                                            {stat.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* CAROUSEL INJECTION AT 1 IMAGE PER SCREEN CONTAINER */}
            {mainImage && (
                <section className="py-12 md:py-16 bg-surface border-b border-border-neutral">
                    <div className="container mx-auto">
                        {hasGallery ? (
                            <ProjectCarousel gallery={project.gallery} projectTitle={project.title} />
                        ) : (
                            /* Fallback single Banner view */
                            <div className="relative w-full h-64 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden bg-surface-container-low border border-border-neutral">
                                <Image
                                    src={mainImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </section>
            )}



            {/* Contact Call to Action */}
            <section className="py-16 md:py-20  bg-primary text-white text-center">
                <div className="container mx-auto">
                    <h3 className="font-headline-md text-headline-md text-white mb-4">
                        Interested in Similar Work?
                    </h3>
                    <p className="font-body-md text-white/80 max-w-2xl mx-auto mb-6">
                        Let's discuss how we can help you with your research and development needs.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-label-caps text-label-caps uppercase rounded-xl hover:bg-warm-beige transition-colors shadow-lg"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default ProjectDetailPage;