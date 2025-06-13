import { createContext, ReactNode, useCallback } from 'react'
import { removeToken, getToken, setToken } from '@/lib/auth.ts'
import { api } from '@/lib/api-client.ts'

export const AuthContext = createContext<{
  isAuthenticated: () => boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}>({
  isAuthenticated: () => false,
  login: () => new Promise(() => {}),
  logout: () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isAuthenticated = () => {
    const token = getToken()

    return !!token
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', {
        user: { email, password },
      })
      if (response?.token) {
        setToken(response.token)
        return true
      } else {
        return false
      }
    } catch {
      return false
    }
  }

  const logout = useCallback(() => {
    removeToken()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
