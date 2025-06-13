import { jwtDecode } from 'jwt-decode'

const TOKEN_KEY = 'auth_token'

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decoded.exp < currentTime
  } catch {
    return true
  }
}

export const getToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null
  if (isTokenExpired(token)) {
    localStorage.removeItem(TOKEN_KEY)
    return null
  }
  return token
}

export interface JWTPayload {
  user_id: number
  exp: number
}

export const getDecodedToken = (): JWTPayload | null => {
  const token = getToken()
  if (!token) return null
  return jwtDecode<JWTPayload>(token)
}

export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export const setToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token)
