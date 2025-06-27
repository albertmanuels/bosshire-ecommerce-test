import { API_URL } from '@/constants/config';
import { ONE_MINUTE } from '@/constants/globals';
import { useQuery } from '@tanstack/react-query';

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const useGetAllProducts = () => {
   const query = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();

      return data as Product[];
    },
    staleTime: ONE_MINUTE
  });

  return query
}

export default useGetAllProducts
