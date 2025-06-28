/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_URL } from '@/constants/config'
import { useMutation } from '@tanstack/react-query'
import { Cart } from './useGetAllCarts'

const usePostNewCart = ({
  onSuccess = (data: Cart) => {},
  onError = (error: Error) => {}
}) => {
  const query = useMutation({
    mutationFn: async (payload: Cart) => {
      const res = await fetch(`${API_URL}/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      return data
    },
    onSuccess: (data) => {
      onSuccess(data)
    },
    onError: (error) => {
      onError(error)
    }
  })
  return query
}

export default usePostNewCart
