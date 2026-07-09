import { resolveMediaUrl } from "./apiMedia";

export const normalizeProject = (project) => ({
    ...project,
    id: project.slug,
    img: resolveMediaUrl(project.cover_image),
    clientLogo: resolveMediaUrl(project.client_logo),
    isFeatured: project.featured,
    statistics: project.statistics || [],
});

export const normalizeProjectPage = (page) => ({
    ...page,
    results: (page.results || []).map(normalizeProject),
});
