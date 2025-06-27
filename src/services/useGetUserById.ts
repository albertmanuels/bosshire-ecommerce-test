import { API_URL } from '@/constants/config'
import { ONE_MINUTE } from '@/constants/globals'
import { useQuery } from '@tanstack/react-query'

const useGetUserById = ({id}: {id: number}) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await fetch(`${API_URL}/users/${id}`)
      const data = await res.json()

      return data
    },
    queryKey: ["user"],
    staleTime: ONE_MINUTE
  })

  return query
}

export default useGetUserById