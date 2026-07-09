import { apiClient } from "./apiClient";
import { normalizeProjectPage } from "./normalizeProject";

export const getProjects = async (params = {}) => {
    const response = await apiClient.get("/projects/", { params });
    return normalizeProjectPage(response.data);
};
