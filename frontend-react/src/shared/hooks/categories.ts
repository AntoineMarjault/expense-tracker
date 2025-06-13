import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api } from '@/lib/api-client.ts'
import { Category } from '@/shared/types/domain.ts'

export const useCategoryIndex = (): UseQueryResult<Category[]> =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => api.get('/categories'),
  })
