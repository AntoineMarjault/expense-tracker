import { jwtDecode } from 'jwt-decode'
import { useSession } from 'next-auth/react'

interface JwtPayload {
  user_id: number
  exp: number
}

export const useJwtPayload = () => {
  const { data: session } = useSession()
  const token = session?.jwt

  if (!token) {
    return null
  }

  return jwtDecode<JwtPayload>(token)
}
