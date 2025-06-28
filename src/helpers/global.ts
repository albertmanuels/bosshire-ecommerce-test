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
export const getNextCartId = (carts: { id: number }[]): number  => {
  const ids = carts.map((c) => c.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

/**
 * Recursively searches through any nested object or array structure
 * to determine if there exists a string value for the given key (`targetKey`)
 * that includes the `searchTerm` (case-insensitive).
 *
 * @param obj - The object or array to search through. Can be deeply nested.
 * @param targetKey - The key to match against in the nested structure (e.g., "title").
 * @param searchTerm - The case-insensitive string to search for inside the value of the matching key.
 * @returns `true` if a match is found; otherwise, `false`.
 *
 * @example
 * const data = {
 *   id: 1,
 *   products: [
 *     {
 *       product: {
 *         title: "Mens Cotton Jacket"
 *       }
 *     }
 *   ]
 * };
 *
 * deepSearchByKey(data, "title", "cotton"); // true
 * deepSearchByKey(data, "title", "keyboard"); // false
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
}