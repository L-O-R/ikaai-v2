import { apiClient } from "./apiClient";
import { normalizeBlog } from "./normalizeBlog";

export const getBlogDetail = async (slug) => {
  const response = await apiClient.get(`/blogs/${slug}/`);
  return normalizeBlog(response.data);
};
