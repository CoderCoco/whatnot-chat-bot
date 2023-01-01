const API_ROOT = "http://localhost:8911/api"

/**
 * Gets a url for a specific endpoint.
 * @param endpoint The endpoint to load from the root. Must start with a `/`
 *
 * @returns A formatted api endpoint.
 */
export function getUrlForEndpoint(endpoint: string): string {
  return `${API_ROOT}${endpoint}`
}
