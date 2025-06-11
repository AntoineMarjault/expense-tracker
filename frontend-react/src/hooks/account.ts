import { jwtDecode } from 'jwt-decode'
import { TOKEN_KEY } from '@/lib/api-client'

interface Account {
  user_id: number
}

interface JWTPayload {
  user_id: number
  exp: number
}

export const useAccount = (): Account => {
  const getStoredToken = () => localStorage.getItem(TOKEN_KEY)

  const token = getStoredToken()
  if (!token) {
    return { user_id: 0 }
  }

  try {
    const payload = jwtDecode<JWTPayload>(token)
    return {
      user_id: payload.user_id,
    }
  } catch {
    return { user_id: 0 }
  }
}
