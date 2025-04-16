import { useJwtPayload } from './auth'

interface Account {
  user_id: number
}

export const useAccount = (): Account => {
  const decodedJWTPayload = useJwtPayload()
  return {
    user_id: decodedJWTPayload?.user_id ?? 0,
  }
}
