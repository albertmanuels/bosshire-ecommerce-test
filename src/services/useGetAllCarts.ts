import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { API_URL } from '@/constants/config';
import { ONE_MINUTE } from '@/constants/globals';
import { Cart } from '@/types/cart';

/**
 * React Query hook to fetch all cart data from the FakeStoreAPI.
 *
 * This hook retrieves an array of cart objects from `${API_URL}/carts` and caches them
 * using React Query with a `staleTime` of 1 minute. It uses `keepPreviousData` to preserve
 * the last fetched result during background refetching, ensuring smooth UI transitions.
 *
 * Features:
 * - Caches carts for 1 minute (`staleTime`)
 * - Maintains previous data while fetching new results (`placeholderData`)
 * - Typed response as `Cart[]`
 *
 * @returns The result of the `useQuery` hook, including `data`, `isLoading`, `error`, etc.
 *
 * @example
 * const { data: carts, isLoading } = useGetAllCarts();
 */
const useGetAllCarts = () => {
  const query = useQuery<Cart[]>({
    placeholderData: keepPreviousData,
    queryFn: async (): Promise<Cart[]> => {
      const res = await fetch(`${API_URL}/carts`);
      const data = await res.json();

      return data;
    },
    queryKey: ["carts"],
    staleTime: ONE_MINUTE,
  });

  return query;
};

export default useGetAllCarts;
