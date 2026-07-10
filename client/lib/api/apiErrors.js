export const getFieldError = (errors, field) => {
    const value = errors?.[field];
    if (Array.isArray(value)) return value[0];
    return typeof value === "string" ? value : "";
};

export const getErrorMessage = (error, fallback = "Something went wrong.") => {
    if (!error) return fallback;
    if (typeof error === "string") return error;
    return error.message || error.data?.detail || fallback;
};
