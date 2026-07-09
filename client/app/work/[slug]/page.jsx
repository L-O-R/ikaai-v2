
import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/ui/PageHero'
import { getProjectDetail } from '@/data/getProjectDetail'


export const revalidate = 3600

export async function generateStaticParams() {

    return []
}

const ProjectDetailPage = async ({ params }) => {
    const { slug } = params

    let project
    try {
        project = await getProjectDetail(slug)
    } catch (error) {
        notFound()
    }

    if (!project) {
        notFound()
    }

    return (
        <main className="bg-surface">

            <PageHero
                eyebrow="Project"
                title={project.title}
                highlight={project.location || ''}
                description={project.description}
            />


            <section className="py-16 md:py-20 px-4 md:px-8 bg-surface">
                <div className="max-w-container-max mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                        {/* Client Info */}
                        {project.client && (
                            <div>
                                <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mb-3">
                                    Client
                                </span>
                                <div className="flex items-center gap-4">
                                    {project.client_logo && (
                                        <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
                                            <Image
                                                src={project.client_logo}
                                                alt={project.client}
                                                fill
                                                className="object-contain"
                                                sizes="80px"
                                            />
                                        </div>
                                    )}
                                    <span className="font-headline-sm text-headline-sm text-on-surface">
                                        {project.client}
                                    </span>
                                </div>
                            </div>
                        )}


                        {project.statistics && project.statistics.length > 0 && (
                            <div>
                                <span className="font-label-caps text-label-caps uppercase text-text-muted tracking-widest block mb-3">
                                    Impact Numbers
                                </span>
                                <div className="grid grid-cols-2 gap-4">
                                    {project.statistics.map((stat, index) => (
                                        <div key={index} className="bg-surface-container-low rounded-xl p-4 border border-border-neutral">
                                            <span className="material-symbols-outlined text-2xl text-primary/60 block mb-1">
                                                {stat.material_symbol || 'trending_up'}
                                            </span>
                                            <span className="font-statistic-num text-3xl font-bold text-primary block">
                                                {stat.value}
                                            </span>
                                            <span className="font-label-caps text-[10px] uppercase tracking-widest text-text-muted">
                                                {stat.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>


            {project.gallery && project.gallery.length > 0 && (
                <section className="py-16 md:py-20 px-4 md:px-8 bg-warm-beige">
                    <div className="max-w-container-max mx-auto">
                        <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest block mb-3">
                            Gallery
                        </span>
                        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">
                            Project in Images
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {project.gallery.map((item, index) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-2xl bg-surface-container-low border border-border-neutral hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="relative aspect-[4/3]">
                                        <Image
                                            src={item.image}
                                            alt={item.caption || 'Project image'}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    {item.caption && (
                                        <div className="p-4 bg-white/90 backdrop-blur-sm">
                                            <p className="font-body-md text-body-md text-on-surface/80 leading-relaxed">
                                                {item.caption}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}


            <section className="py-12 px-4 md:px-8 bg-surface">
                <div className="max-w-container-max mx-auto text-center">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 font-label-caps text-label-caps uppercase text-primary hover:text-primary/80 transition-colors group"
                    >
                        <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
                            arrow_back
                        </span>
                        Back to All Projects
                    </Link>
                </div>
            </section>


            <section className="py-16 md:py-20 px-4 md:px-8 bg-primary text-white text-center">
                <div className="max-w-container-max mx-auto">
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

export default ProjectDetailPage