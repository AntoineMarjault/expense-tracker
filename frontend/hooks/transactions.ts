import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Transaction } from '@/types/domain'
import { TransactionCreate, TransactionUpdate } from '@/types/api'

export const useTransactionIndex = (): UseQueryResult<Transaction[]> =>
  useQuery({
    queryKey: ['transactions'],
    queryFn: async () => api.get('/transactions'),
  })

export const useTransactionShow = (id: number) =>
  useQuery({
    queryKey: ['transactions', id],
    queryFn: () => api.get(`/transactions/${id}`),
    enabled: !!id,
  })

export const useTransactionCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: TransactionCreate) => api.post('/transactions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}

export const useTransactionUpdate = (id: number) => {
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

export const useTransactionDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => api.delete(`/transactions/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['transactions', id] })
    },
  })
}
