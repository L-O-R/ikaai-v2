import { apiClient } from "./apiClient";
import { resolveMediaUrl } from "./apiMedia";

export const normalizeUpdate = (update) => ({
  ...update,
  image: resolveMediaUrl(update.image),
});

export const getUpdates = async () => {
  const response = await apiClient.get("/updates/");
  const list = response.data?.results || [];
  return list.map(normalizeUpdate);
};

