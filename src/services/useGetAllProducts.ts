import { API_URL } from '@/constants/config';
import { ONE_MINUTE } from '@/constants/globals';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

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
    placeholderData: keepPreviousData,
    queryFn: async (): Promise<Product[]> => {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();

      return data as Product[];
    },
    queryKey: ["products"],
    staleTime: ONE_MINUTE
  });

  return query
}

export default useGetAllProducts
