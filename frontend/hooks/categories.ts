import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Category } from '@/types/domain'

export function useCategoryIndex(): UseQueryResult<Category[]> {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => api.get('/categories'),
  })
}
