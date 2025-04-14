import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api-client'

interface User {
  email: string
  password: string
}

interface UserCreateRequest {
  user: User
}

export const useUserCreate = () =>
  useMutation({
    mutationFn: (data: UserCreateRequest) => api.post('/signup', data),
  })
