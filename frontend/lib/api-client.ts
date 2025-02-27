const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = {
  async get(endpoint: string) {
    console.log('API_URL', API_URL)
    console.log('endpoint', endpoint)
    const response = await fetch(`${API_URL}${endpoint}`)
    if (!response.ok) throw new Error('API Error')
    return response.json()
  },

  async post(endpoint: string, data: unknown) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('API Error')
    return response.json()
  },

  async put(endpoint: string, data: unknown) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('API Error')
    return response.json()
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('API Error')
    return response.json()
  },
}
