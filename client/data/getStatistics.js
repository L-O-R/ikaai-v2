import { apiClient } from "./apiClient";

export const getStatistics = async () => {
    const response = await apiClient.get("/statistics/");
    return response.data;
};
