import { apiClient } from "./apiClient";

export const createInquiry = async (payload) => {
    const response = await apiClient.post("/inquiries/", payload);
    return response.data;
};
