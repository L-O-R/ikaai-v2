import { resolveMediaUrl } from "./apiMedia";

export const normalizeProject = (project) => {
    if (!project) return null;
    const clientData = project.client || {};
    return {
        ...project,
        id: project.slug,
        img: resolveMediaUrl(project.featured_image),
        client: clientData.name || "",
        clientLogo: resolveMediaUrl(clientData.logo),
        clientWebsite: clientData.website || "",
        statistics: project.statistics || [],
        coverage: project.coverage,
        industry: project.industry,
        scopeOfWork: project.scope_of_work,
        sampleSize: project.sample_size,
        introduction: project.introduction,
    };
};

export const normalizeProjectPage = (page) => ({
    ...page,
    results: (page.results || []).map(normalizeProject),
});
