import { apiOrigin } from "./apiClient";

export const resolveMediaUrl = (path) => {
    if (!path) return "";

    try {
        return new URL(path, apiOrigin).toString();
    } catch {
        return path;
    }
};
