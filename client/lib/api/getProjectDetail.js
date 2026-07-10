import { apiClient } from "./apiClient";
import { normalizeProject } from "./normalizeProject";

export const getProjectDetail = async (slug) => {
    const response = await apiClient.get(`/projects/${slug}/`);
    return normalizeProject(response.data);
};
