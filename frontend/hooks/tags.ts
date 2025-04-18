import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { api } from '@/lib/api-client'
import { Tag } from '@/types/domain'

export const useTagIndex = (): UseQueryResult<Tag[]> =>
  useQuery({
    queryKey: ['tags'],
    queryFn: async () => api.get('/tags'),
  })
