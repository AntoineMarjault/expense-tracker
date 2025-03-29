import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Budget } from '@/types/domain'

export function useBudgetIndex(): UseQueryResult<Budget[]> {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: async () => api.get('/budgets'),
  })
}

// todo: fix id type (and in transaction hooks as well)
export function useBudgetShow(id: string): UseQueryResult<Budget> {
  return useQuery({
    queryKey: ['budgets', id],
    queryFn: async () => api.get(`/budgets/${id}`),
  })
}
