const TOKEN_KEY = 'auth_token'

const getStoredToken = () => localStorage.getItem(TOKEN_KEY)
const setStoredToken = (token: string) => localStorage.setItem(TOKEN_KEY, token)
const removeStoredToken = () => localStorage.removeItem(TOKEN_KEY)

export const api = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    const token = getStoredToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      if (response.status === 401) {
        removeStoredToken()
      }
      throw new Error('API request failed')
    }

    if (response.status === 204 || response.status === 201) {
      return null
    }

    return response.json()
  },
  async login(email: string, password: string) {
    const response = await this.post('/login', {
      user: { email, password },
    })
    if (response?.token) {
      setStoredToken(response.token)
    }
    return response
  },
  logout() {
    removeStoredToken()
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
