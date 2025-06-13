import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useLocation } from 'react-router'
import { removeToken, getToken, setToken } from '@/lib/auth.ts'
import { api } from '@/lib/api-client.ts'

const publicRoutes = ['/auth/login', '/auth/signup']

export const AuthContext = createContext<{
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}>({
  isAuthenticated: false,
  login: () => new Promise(() => {}),
  logout: () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', {
        user: { email, password },
      })
      if (response?.token) {
        setToken(response.token)
        setIsAuthenticated(true)
        return true
      } else {
        setIsAuthenticated(false)
        return false
      }
    } catch {
      setIsAuthenticated(false)
      return false
    }
  }

  const logout = useCallback(() => {
    removeToken()
    setIsAuthenticated(false)
  }, [])

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(location.pathname)
    if (isPublicRoute) {
      return
    }

    const token = getToken()
    if (!token) {
      logout()
      return
    }

    setIsAuthenticated(true)
  }, [location.pathname, logout])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
