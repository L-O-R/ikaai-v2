import { getProjects } from "./getProjects";

export const getFeaturedProjects = async () =>
    getProjects({
        featured: true,
        page_size: 4,
    });
