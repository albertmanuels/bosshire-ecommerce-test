import { API_URL } from '@/constants/config'
import { ONE_MINUTE } from '@/constants/globals'
import { User } from '@/stores/useAuthStore'
import {  useQuery, UseQueryOptions } from '@tanstack/react-query'

const useGetUserById = ({id}: {id: number}, options?: Partial<UseQueryOptions<User>>) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await fetch(`${API_URL}/users/${id}`)
      const data = await res.json()

      return data
    },
    queryKey: ["user", id],
    staleTime: ONE_MINUTE,
    ...options
  })

  return query
}

export default useGetUserById