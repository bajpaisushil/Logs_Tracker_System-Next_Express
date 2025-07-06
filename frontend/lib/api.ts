const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
    throw new ApiError(response.status, errorData.error || `HTTP ${response.status}`)
  }

  return response.json()
}

export const api = {
  logs: {
    getAll: (filters: Record<string, string> = {}) => {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
      const query = params.toString()
      return apiRequest<any[]>(`/logs${query ? `?${query}` : ""}`)
    },

    create: (log: any) =>
      apiRequest<any>("/logs", {
        method: "POST",
        body: JSON.stringify(log),
      }),

    getAnalytics: (filters: Record<string, string> = {}) => {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
      const query = params.toString()
      return apiRequest<any>(`/logs/analytics${query ? `?${query}` : ""}`)
    },
  },
}
