import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/constants/config';
import { ONE_MINUTE } from '@/constants/globals';
import { Product } from '@/types/product';
import { DeepRequired } from '@/types/utils';

/**
 * React Query hook to fetch a single product by its ID from the FakeStoreAPI.
 *
 * This hook retrieves detailed product information from the endpoint `${API_URL}/products/:id`,
 * and returns a deeply required product type (`DeepRequired<Product>`) to ensure all fields
 * are present and fully typed.
 *
 * Features:
 * - Typed response with all fields required
 * - Caches product data using `queryKey: ['product', id]`
 * - Prevents unnecessary refetching for 1 minute (`staleTime`)
 *
 * @param {Object} params - Parameters object
 * @param {number} params.id - The product ID to fetch
 *
 * @returns The result of the `useQuery` hook, including `data`, `isLoading`, `error`, etc.
 *
 * @example
 * const { data: product, isLoading } = useGetProductById({ id: 5 });
 */
const useGetProductById = ({ id }: {id: number}) => {
  const query = useQuery<DeepRequired<Product>>({
    queryFn: async (): Promise<DeepRequired<Product>> => {
      const res = await fetch(`${API_URL}/products/${id}`);
      const data = await res.json();

      return data;
    },
    staleTime: ONE_MINUTE,
    queryKey: ["product", id],
  });
  return query;
};

export default useGetProductById;
