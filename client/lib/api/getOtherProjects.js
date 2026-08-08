import { apiClient } from "./apiClient";

export const getOtherProjects = async () => {
    const response = await apiClient.get("/projects/other/");
    const data = response.data;
    return Array.isArray(data) ? data : (data?.results || []);
};
