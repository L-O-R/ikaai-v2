import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getProjectDetail } from "@/lib/api/getProjectDetail";
import { getProjects } from "@/lib/api/getProjects";

export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

const MetaRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center py-5 border-b border-border-neutral last:border-b-0">
      <span className="font-sans text-body-sm text-text-muted font-normal">
        {label}
      </span>
      <span className="font-sans text-body-md text-on-surface font-semibold text-right max-w-[65%]">
        {value}
      </span>
    </div>
  );
};

const ProjectDetailPage = async ({ params }) => {
  const { slug } = await params;

  let project;
  try {
    project = await getProjectDetail(slug);
  } catch (error) {
    notFound();
  }

  if (!project) {
    notFound();
  }

  // Fetch other projects to showcase at the end (fallback to empty list if API fails)
  let otherProjects = [];
  try {
    const allProjectsPage = await getProjects({ page_size: 4 });
    otherProjects = (allProjectsPage?.results || [])
      .filter((p) => p.slug !== slug)
      .slice(0, 2);
  } catch (error) {
    console.error("Failed to fetch other projects:", error);
  }

  const featuredImage = project.img || null;
  return (
    <main className="bg-surface">
      {/* Title + Introduction + Details Section */}
      <section className="bg-surface pt-20 md:pt-28 pb-12 md:pb-20">
        <div className="container-size">
          {/* Main Project Title */}
          <ScrollReveal>
            <h1 className="font-display text-display-lg text-on-surface font-bold tracking-tight mb-16 leading-tight max-w-5xl">
              {project.title}
            </h1>
          </ScrollReveal>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Column: Introduction badge */}
            <ScrollReveal className="lg:col-span-4">
              <div className="inline-flex items-center gap-2 text-on-surface font-sans text-body-md font-semibold tracking-wider">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-on-surface text-surface text-xs font-bold leading-none">
                  +
                </span>
                <span>Introduction</span>
              </div>
            </ScrollReveal>

            {/* Right Column: Paragraph + Metadata Table + Logos */}
            <ScrollReveal
              delay={0.1}
              className="lg:col-span-8 flex flex-col gap-10"
            >
              {/* Introduction text */}
              {project.introduction && (
                <p className="font-sans text-body-lg text-on-surface/90 leading-relaxed font-normal">
                  {project.introduction}
                </p>
              )}

              {/* Metadata Table */}
              <div className="border-t border-border-neutral border-b">
                <MetaRow label="Industry" value={project.industry} />
                <MetaRow label="Scope of work" value={project.scopeOfWork} />
                <MetaRow label="Coverage" value={project.coverage} />
                <MetaRow label="Sample Size" value={project.sampleSize} />
              </div>

              {/* Client logo / name */}
              {project.client && (
                <div className="flex items-center gap-4 mt-2">
                  {project.clientLogo ? (
                    <div className="relative w-24 h-16 bg-transparent">
                      <Image
                        src={project.clientLogo}
                        alt={project.client}
                        width={96}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="font-sans text-body-sm font-semibold tracking-wide text-text-muted">
                      {project.client}
                    </span>
                  )}
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {featuredImage && (
        <section className="bg-surface-container-low py-12">
          <div className="container-size">
            <ScrollReveal>
              <div className="relative lg:w-[70%] ml-auto h-75 sm:h-112.5 lg:h-150 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={featuredImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Project Statistics (Impact Numbers) */}
      {project.statistics && project.statistics.length > 0 && (
        <section className="bg-surface border-t border-border-neutral py-16 md:py-24">
          <div className="container-size">
            <ScrollReveal>
              <span className="font-sans text-label-caps uppercase text-primary tracking-widest block mb-10 text-xs">
                Impact Numbers
              </span>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {project.statistics.map((stat, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-surface-container-low rounded-2xl p-6 border border-border-neutral hover-lift">
                    <span className="material-symbols-outlined text-primary/70 block mb-3 text-3xl">
                      {stat.material_symbol || "trending_up"}
                    </span>
                    <span className="font-display text-3xl md:text-4xl font-bold text-primary block mb-2">
                      {stat.value}
                    </span>
                    <span className="font-sans text-xs font-semibold text-text-muted uppercase tracking-wider">
                      {stat.title}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Projects Showcase (Explore More Projects) */}
      <section className="bg-surface-container-low border-t border-background py-16 md:py-24">
        <div className="container-size">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="font-sans text-label-caps uppercase text-primary tracking-widest block mb-2 text-xs">
                  Portfolio Showcase
                </span>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-on-surface">
                  Explore More Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-body-sm font-sans text-primary font-semibold hover:text-primary-hover transition-colors duration-300 group"
              >
                <span>View All Projects</span>
                <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
            </div>
          </ScrollReveal>

          {otherProjects && otherProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {otherProjects.map((proj, idx) => (
                <ScrollReveal key={proj.title || idx} delay={idx * 0.15}>
                  <Link href={`/projects/${proj.slug}`}>
                    <ProjectCard
                      project={proj}
                      bg_color={`bg-warm-beige`}
                    />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Call to Action */}
      <section className="py-16 md:py-24 bg-warm-beige text-center">
        <div className="container-size">
          <ScrollReveal>
            <h3 className="font-display text-headline-md text-on-surface mb-4">
              Interested in Similar Research?
            </h3>
            <p className="font-sans text-text-muted max-w-2xl mx-auto mb-8">
              Let's discuss how we can help you with your research and
              assessment needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-sans text-label-caps uppercase rounded-xl hover:bg-warm-beige transition-colors shadow-lg"
            >
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetailPage;
