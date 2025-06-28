export const getNextCartId = (carts: { id: number }[]): number  => {
  const ids = carts.map((c) => c.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}