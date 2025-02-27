import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { api } from '@/lib/api-client'
import { transformTransaction } from '@/lib/transforms'
import { Transaction } from '@/types/domain';

export function useTransactionIndex(): UseQueryResult<Transaction[]> {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const data = await api.get('/transactions')
      return data.map(transformTransaction)
    },
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
    mutationFn: (data: unknown) => api.post('/transactions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })
}
