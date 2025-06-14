import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api } from '@/lib/api-client'

export const useCurrencyIndex = (): UseQueryResult<string[]> =>
  useQuery({
    queryKey: ['currencies'],
    queryFn: async () => api.get('/currencies'),
  })
