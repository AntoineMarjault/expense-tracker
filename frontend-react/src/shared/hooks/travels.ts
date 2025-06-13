import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { api } from '@/lib/api-client.ts'
import { Travel, TravelStatistics } from '@/shared/types/domain.ts'

export const useTravelIndex = (): UseQueryResult<Travel[]> =>
  useQuery({
    queryKey: ['travels'],
    queryFn: async () => api.get('/travels'),
  })

export const useTravelShow = (id: number): UseQueryResult<Travel> =>
  useQuery({
    queryKey: ['travels', id],
    queryFn: async () => api.get(`/travels/${id}`),
  })

export const useTravelCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Omit<Travel, 'id'>) => api.post('/travels', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travels'] })
    },
  })
}

export const useTravelUpdate = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Omit<Travel, 'id'>>) =>
      api.patch(`/travels/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travels'] })
      queryClient.invalidateQueries({ queryKey: ['travels', id] })
    },
  })
}

export const useTravelDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => api.delete(`/travels/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['travels'] })
      queryClient.invalidateQueries({ queryKey: ['travels', id] })
    },
  })
}

export const useTravelStatisticsShow = (
  id: number,
): UseQueryResult<TravelStatistics> =>
  useQuery({
    queryKey: ['travels', id, 'statistics'],
    queryFn: async () => api.get(`/travels/${id}/statistics`),
  })
