// Centralized API client for all backend requests.
// VITE_API_BASE_URL is set at build time via .env.production / CI environment variable.
// Falls back to local backend for development.

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001').replace(/\/$/, '')

const API_V1 = `${BASE_URL}/api/v1`

// 15s timeout — accommodates Lambda cold starts (usually 1–3s, up to 10s worst case)
const DEFAULT_TIMEOUT_MS = 15_000

export async function apiFetch(path, options = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

  try {
    const response = await fetch(`${API_V1}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // Needed for cross-origin Lambda / API Gateway requests
      mode: 'cors',
      credentials: 'omit',
    })
    clearTimeout(timeoutId)
    return response
  } catch (err) {
    clearTimeout(timeoutId)
    throw err
  }
}

// Re-export base URLs for services that build their own URLs
export { API_V1, BASE_URL }

