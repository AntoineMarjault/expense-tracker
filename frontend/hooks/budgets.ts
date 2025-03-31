import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
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

export function useBudgetCreate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<Budget, 'id'>) => api.post('/budgets', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })
}

export function useBudgetUpdate(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Omit<Budget, 'id'>>) =>
      api.patch(`/budgets/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
      queryClient.invalidateQueries({ queryKey: ['budgets', id] })
    },
  })
}
