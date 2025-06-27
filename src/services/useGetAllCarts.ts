import { API_URL } from '@/constants/config'
import { ONE_MINUTE } from '@/constants/globals'
import { useQuery } from '@tanstack/react-query'

export interface Cart {
  id: number;
  userId: number;
  date: string;
  product: Array<{
    productId: number,
    quantity: number
  }>
}

const useGetAllCarts = () => {
  const query = useQuery<Cart[]>({
    queryFn: async (): Promise<Cart[]>  => {
      const res = await fetch(`${API_URL}/carts`)
      const data = await res.json()

      return data
    },
    queryKey: ["carts"],
    staleTime: ONE_MINUTE
  })

  return query
}

export default useGetAllCarts
