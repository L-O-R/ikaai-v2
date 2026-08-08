import { apiClient } from "./apiClient";
import { resolveMediaUrl } from "./apiMedia";

export const normalizeClient = (client) => ({
  ...client,
  section_logo: resolveMediaUrl(client.section_logo),
  project_logo: resolveMediaUrl(client.project_logo),
  client_section_image: resolveMediaUrl(client.client_section_image),
  project_image: resolveMediaUrl(client.project_image),
  src: resolveMediaUrl(client.client_section_image) || resolveMediaUrl(client.section_logo),
  alt: client.name,
});

export const getClients = async () => {
  const response = await apiClient.get("/clients/");
  const data = response.data;
  const list = Array.isArray(data) ? data : (data?.results || []);
  return list.map(normalizeClient);
};

