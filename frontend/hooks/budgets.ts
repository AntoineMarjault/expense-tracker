import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Budget } from '@/types/domain'

export const useBudgetIndex = (): UseQueryResult<Budget[]> =>
  useQuery({
    queryKey: ['budgets'],
    queryFn: async () => api.get('/budgets'),
  })

export const useBudgetShow = (id: number): UseQueryResult<Budget> =>
  useQuery({
    queryKey: ['budgets', id],
    queryFn: async () => api.get(`/budgets/${id}`),
  })

export const useBudgetCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<Budget, 'id'>) => api.post('/budgets', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })
}

export const useBudgetUpdate = (id: number) => {
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

export const useBudgetDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => api.delete(`/budgets/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
      queryClient.invalidateQueries({ queryKey: ['budgets', id] })
    },
  })
}
