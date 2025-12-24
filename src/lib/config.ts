// Centralized API base for frontend. Uses Vite env var `VITE_API_BASE` if set.
export const API_BASE: string = (
  (import.meta.env.VITE_API_BASE as string)
).replace(/\/$/, '')

export const joinApi = (path: string) => `${API_BASE}/${path.replace(/^\//, '')}`
