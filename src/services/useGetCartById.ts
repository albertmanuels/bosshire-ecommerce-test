import { API_URL } from '@/constants/config'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Cart } from './useGetAllCarts'
import { ONE_MINUTE } from '@/constants/globals'

const useGetCartById = ({id}:{id: number | null}, options?: Partial<UseQueryOptions<Cart>>) => {
  const query = useQuery<Cart>({
    queryFn: async (): Promise<Cart> => {
      const res = await fetch(`${API_URL}/carts/${id}`)
      const data = await res.json()

      return data
    },
    queryKey: ["cart", id],
    staleTime: ONE_MINUTE,
    ...options
  })
  return query
}

export default useGetCartById
