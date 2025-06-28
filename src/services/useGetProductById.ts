import { API_URL } from '@/constants/config'
import { useQuery } from '@tanstack/react-query'
import { Product } from './useGetAllProducts'
import { ONE_MINUTE } from '@/constants/globals';

export interface ProductSingle extends Product {
  rating: {
    rate: number;
    count: number
  }
}

const useGetProductById = ({id}: {id: number}) => {
  const query =  useQuery<ProductSingle>({
    queryFn: async (): Promise<ProductSingle> => {
      const res = await fetch(`${API_URL}/products/${id}`)
      const data = await res.json()

      return data
    },
    staleTime: ONE_MINUTE,
    queryKey: ["product", id]
  })
  return query
}

export default useGetProductById
