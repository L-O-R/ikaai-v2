import axios from "axios";

const cleanEnvUrl = (value) => {
    if (!value) return "";
    const trimmed = value.trim();
    return trimmed && trimmed !== "undefined" && trimmed !== "null" ? trimmed : "";
};

export const apiOrigin =
    cleanEnvUrl(process.env.NEXT_PUBLIC_API_ORIGIN) || "http://127.0.0.1:8000";

export const apiClient = axios.create({
    baseURL: cleanEnvUrl(process.env.NEXT_PUBLIC_API_BASE_URL) || `${apiOrigin}/api`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const data = error.response?.data;
        const message =
            data?.detail ||
            data?.message ||
            error.message ||
            "Something went wrong. Please try again.";

        return Promise.reject({
            ...error,
            status: error.response?.status,
            data,
            message,
        });
    }
);
