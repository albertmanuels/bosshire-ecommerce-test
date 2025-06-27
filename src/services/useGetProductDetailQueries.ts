"use client"
import { useQueries } from '@tanstack/react-query'
import { Cart } from './useGetAllCarts'
import { API_URL } from '@/constants/config'
import { Product } from './useGetAllProducts'

const useGetProductDetailQueries = ({cart}: {cart: Cart}) => {
  const query = useQueries<Product[]>({
    queries: cart?.products?.map((item) => ({
      queryKey: ['product', item.productId ],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/products/${item.productId}`)
        const data = await res.json()

        return data
      },
      enable: !!cart
    })) || []
  })

  return query
}

export default useGetProductDetailQueries
