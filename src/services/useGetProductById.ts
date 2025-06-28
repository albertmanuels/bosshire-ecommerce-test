import { API_URL } from '@/constants/config'
import { useQuery } from '@tanstack/react-query'
import { ONE_MINUTE } from '@/constants/globals';
import { DeepRequired } from '@/types/utils';
import { Product } from '@/types/product';

const useGetProductById = ({id}: {id: number}) => {
  const query =  useQuery<DeepRequired<Product>>({
    queryFn: async (): Promise<DeepRequired<Product>> => {
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
