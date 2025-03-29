import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Transaction } from '@/types/domain'
import { TransactionCreate, TransactionUpdate } from '@/types/api'

export function useTransactionIndex(): UseQueryResult<Transaction[]> {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => api.get('/transactions'),
  })
}

export function useTransactionShow(id: string) {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: () => api.get(`/transactions/${id}`),
    enabled: !!id,
  })
}

export function useTransactionCreate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TransactionCreate) => api.post('/transactions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}

export function useTransactionUpdate(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TransactionUpdate) =>
      api.patch(`/transactions/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['transactions', id] })
    },
  })
}

export function useTransactionDelete() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.delete(`/transactions/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['transactions', id] })
    },
  })
}
