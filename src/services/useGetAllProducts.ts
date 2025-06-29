import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { API_URL } from '@/constants/config';
import { ONE_MINUTE } from '@/constants/globals';
import { Product } from '@/types/product';

/**
 * React Query hook to fetch all products from the FakeStoreAPI.
 *
 * This hook retrieves the full list of products from `${API_URL}/products`,
 * and caches the result using React Query. It uses `keepPreviousData` to retain
 * the previously fetched data during background refetching, ensuring a smoother UX.
 *
 * Features:
 * - Typed response as `Product[]`
 * - Retains previous data while refetching (`placeholderData`)
 * - Prevents automatic refetching for 1 minute (`staleTime`)
 *
 * @returns The result of the `useQuery` hook, including `data`, `isLoading`, `isError`, etc.
 *
 * @example
 * const { data: products, isLoading } = useGetAllProducts();
 */
const useGetAllProducts = () => {
   const query = useQuery<Product[]>({
    placeholderData: keepPreviousData,
    queryFn: async (): Promise<Product[]> => {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();

      return data as Product[];
    },
    queryKey: ["products"],
    staleTime: ONE_MINUTE,
  });

  return query;
};

export default useGetAllProducts;
