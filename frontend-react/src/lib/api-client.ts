export const api = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    const response = await fetch(`${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error('API request failed')
    }

    if (response.status === 204 || response.status === 201) {
      return null
    }

    return response.json()
  },
  get(endpoint: string) {
    return this.fetch(endpoint)
  },
  post(endpoint: string, data: unknown) {
    return this.fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  patch(endpoint: string, data: unknown) {
    return this.fetch(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },
  delete(endpoint: string) {
    return this.fetch(endpoint, {
      method: 'DELETE',
    })
  },
}
