import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Category } from '@/types/domain'

export const useCategoryIndex = (): UseQueryResult<Category[]> =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => api.get('/categories'),
  })
