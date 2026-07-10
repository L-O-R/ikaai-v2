import { apiClient } from "./apiClient";

export const createJobApplication = async (payload) => {
    const response = await apiClient.post("/jobs/job-applications/", payload);
    return response.data;
};
