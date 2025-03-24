import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Budget } from '@/types/domain'

export function useBudgetIndex(): UseQueryResult<Budget[]> {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: async () => api.get('/budgets'),
  })
}
