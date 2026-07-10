import { getProjects } from "./getProjects";

export const getProjectLocations = async () =>
    getProjects({
        page_size: 48,
        ordering: "location",
    });
