import { getDecodedToken } from '@/lib/auth.ts'

interface Account {
  user_id?: number
}

export const useAccount = (): Account => {
  const decodedToken = getDecodedToken()

  return { user_id: decodedToken?.user_id }
}
