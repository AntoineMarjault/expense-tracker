import { getSession } from 'next-auth/react'

export const api = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const session = await getSession()

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (session?.jwt) {
      headers['Authorization'] = `Bearer ${session.jwt}`
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    )

    if (!response.ok) {
      throw new Error('API request failed')
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
  put(endpoint: string, data: unknown) {
    return this.fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
  delete(endpoint: string) {
    return this.fetch(endpoint, {
      method: 'DELETE',
    })
  },
}
