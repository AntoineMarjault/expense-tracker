import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Country } from '@/types/domain'

export const useCountryIndex = (): UseQueryResult<Country[]> =>
  useQuery({
    queryKey: ['countries'],
    queryFn: async () => api.get('/countries'),
  })
