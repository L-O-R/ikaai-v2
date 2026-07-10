import { apiClient } from "./apiClient";

export const getJobs = async (params = {}) => {
    const response = await apiClient.get("/jobs/jobs/", { params });
    return response.data;
};

