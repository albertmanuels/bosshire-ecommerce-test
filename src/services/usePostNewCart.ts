import { API_URL } from '@/constants/config'
import { useMutation } from '@tanstack/react-query'
import { Cart } from './useGetAllCarts'

const usePostNewCart = ({
  onSuccess = (data, variables) => {},
  onError = (error) => {}
}) => {
  const query = useMutation({
    mutationFn: async (payload) => {
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
    onSuccess: (data, variables) => {
      onSuccess(data, variables)
    },
    onError: (error) => {
      onError(error)
    }
  })
  return query
}

export default usePostNewCart
