import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { api } from '@/lib/api-client.ts'
import { Transaction } from '@/shared/types/domain.ts'
import { TransactionCreate, TransactionUpdate } from '@/shared/types/api.ts'

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
    mutationFn: (transaction: TransactionCreate) =>
      api.post('/transactions', { transaction }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}

export const useTransactionUpdate = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (transaction: TransactionUpdate) =>
      api.patch(`/transactions/${id}`, { transaction }),
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

export const useLastTransaction = () => {
  const { data: transactions } = useTransactionIndex()

  return transactions?.[0] ?? null
}
