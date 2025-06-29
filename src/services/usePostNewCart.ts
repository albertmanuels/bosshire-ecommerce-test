/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/constants/config';
import { Cart } from '@/types/cart';

/**
 * React Query mutation hook to create a new cart in the FakeStoreAPI.
 *
 * This hook sends a POST request to `${API_URL}/carts` with the given cart payload,
 * and provides optional `onSuccess` and `onError` handlers to respond to the mutation result.
 *
 * Features:
 * - Sends JSON-formatted cart data to the API
 * - Accepts optional lifecycle callbacks (`onSuccess`, `onError`)
 * - Returns full mutation object from React Query (e.g., `mutate`, `status`, `data`, etc.)
 *
 * @param {Object} handlers - Optional callback handlers
 * @param {(data: Cart) => void} [handlers.onSuccess] - Callback triggered on successful POST
 * @param {(error: Error) => void} [handlers.onError] - Callback triggered on POST failure
 *
 * @returns The mutation object from `useMutation`, including `mutate`, `isLoading`, `data`, `error`, etc.
 *
 * @example
 * const { mutate: postCart, isLoading } = usePostNewCart({
 *   onSuccess: (newCart) => toast.success("Cart created!"),
 *   onError: (err) => toast.error(err.message),
 * });
 *
 * postCart({ userId: 3, date: new Date().toISOString(), products: [...] });
 */
const usePostNewCart = ({
  onSuccess = (data: Cart) => {},
  onError = (error: Error) => {},
}) => {
  const query = useMutation({
    mutationFn: async (payload: Cart) => {
      const res = await fetch(`${API_URL}/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error) => {
      onError(error);
    },
  });
  return query;
};

export default usePostNewCart;
