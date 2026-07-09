import { apiClient } from "./apiClient";
import { resolveMediaUrl } from "./apiMedia";

export const normalizeClient = (client) => ({
  ...client,
  logo: resolveMediaUrl(client.logo),
  src: resolveMediaUrl(client.logo),
  alt: client.name,
});

export const getClients = async () => {
  const response = await apiClient.get("/clients/");
  return (response.data || []).map(normalizeClient);
};
