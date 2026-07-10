import { apiClient } from "./apiClient";
import { normalizeBlogPage } from "./normalizeBlog";

export const getBlogs = async (params = {}) => {
  const response = await apiClient.get("/blogs/", { params });
  return normalizeBlogPage(response.data);
};
