import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { API_URL } from '@/constants/config';
import { ONE_MINUTE } from '@/constants/globals';
import { User } from '@/stores/useAuthStore';

/**
 * React Query hook to fetch a single user by ID from the FakeStoreAPI.
 *
 * This hook retrieves user data from `${API_URL}/users/:id` and caches the result
 * using a unique query key based on the user ID. It supports optional configuration
 * through the `options` parameter to allow custom behavior (e.g. retries, refetching).
 *
 * Features:
 * - Fetches user details for a given ID
 * - Uses a unique query key: `["user", id]`
 * - Caches the result and avoids refetching for 1 minute (`staleTime`)
 * - Supports React Query options via the `options` parameter
 *
 * @param {Object} params - Parameters object
 * @param {number} params.id - ID of the user to fetch
 * @param {Partial<UseQueryOptions<User>>} [options] - Optional React Query config overrides
 *
 * @returns The result of the `useQuery` hook, including `data`, `isLoading`, `isError`, etc.
 *
 * @example
 * const { data: user, isLoading } = useGetUserById({ id: 3 });
 */
const useGetUserById = ({ id }: {id: number}, options?: Partial<UseQueryOptions<User>>) => {
  const query = useQuery({
    queryFn: async () => {
      const res = await fetch(`${API_URL}/users/${id}`);
      const data = await res.json();

      return data;
    },
    queryKey: ["user", id],
    staleTime: ONE_MINUTE,
    ...options,
  });

  return query;
};

export default useGetUserById;