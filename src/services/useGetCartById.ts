import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { API_URL } from '@/constants/config';
import { ONE_MINUTE } from '@/constants/globals';
import { Cart } from '@/types/cart';

/**
 * React Query hook to fetch a single cart by its ID from the FakeStoreAPI.
 *
 * This hook retrieves a specific cart from the endpoint `${API_URL}/carts/:id`.
 * It supports optional React Query configuration via the `options` parameter, allowing
 * the caller to customize behavior such as caching, error handling, or retry strategy.
 *
 * Features:
 * - Fetches a single cart based on the provided `id`
 * - Supports query customization through the `options` parameter
 * - Uses a `staleTime` of 1 minute to prevent unnecessary refetches
 * - Automatically generates a unique query key: `["cart", id]`
 *
 * @param {Object} params - Parameters object
 * @param {number | null} params.id - The cart ID to fetch (must not be `null`)
 * @param {Partial<UseQueryOptions<Cart>>} [options] - Optional React Query config overrides
 *
 * @returns The result of the `useQuery` hook, including `data`, `isLoading`, `error`, etc.
 *
 * @example
 * const { data: cart, isLoading } = useGetCartById({ id: 3 });
 */
const useGetCartById = ({ id }:{id: number | null}, options?: Partial<UseQueryOptions<Cart>>) => {
  const query = useQuery<Cart>({
    queryFn: async (): Promise<Cart> => {
      const res = await fetch(`${API_URL}/carts/${id}`);
      const data = await res.json();

      return data;
    },
    queryKey: ["cart", id],
    staleTime: ONE_MINUTE,
    ...options,
  });
  return query;
};

export default useGetCartById;
