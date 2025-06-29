/**
 * Generates the next unique cart ID based on the highest existing cart ID in the array.
 *
 * @param carts - An array of cart objects, each containing a numeric `id` property.
 * @returns The next cart ID as a number. If the array is empty, returns `1` as the starting ID.
 *
 * @example
 * getNextCartId([{ id: 1 }, { id: 5 }, { id: 3 }]); // 6
 * getNextCartId([]); // 1
 */
export const getNextCartId = (carts: { id: number }[]): number => {
  const ids = carts.map((c) => c.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

/**
 * Recursively searches through a deeply nested object or array structure
 * to determine if any property with the specified key contains the search term (case-insensitive).
 *
 * This function is useful when working with unstructured or deeply nested data
 * and you need to find whether any nested field matches a given key and value.
 *
 * @param obj - The input object or array to search. Can be of any depth and structure.
 * @param targetKey - The key to match during traversal (e.g. "title").
 * @param searchTerm - The string to match against the value of the target key (case-insensitive).
 * @returns `true` if a matching key with a matching value is found; otherwise, `false`.
 *
 * @example
 * const data = {
 *   cart: {
 *     items: [
 *       {
 *         product: {
 *           title: "Monitor LG Curved"
 *         }
 *       }
 *     ]
 *   }
 * };
 *
 * deepSearchByKey(data, "title", "curved"); // true
 * deepSearchByKey(data, "title", "ring"); // false
 */

export const deepSearchByKey = (obj: unknown, targetKey: string, searchTerm: string): boolean => {
  if (Array.isArray(obj)) {
    return obj.some(item => deepSearchByKey(item, targetKey, searchTerm));
  }

  if (typeof obj === "object" && obj !== null) {
    return Object.entries(obj).some(([key, value]) => {
      if (key === targetKey && typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return deepSearchByKey(value, targetKey, searchTerm);
    });
  }

  return false;
};