import { Cart, EnrichedCart } from '@/types/cart';
import { Product } from '@/types/product';

/**
 * Enriches a single cart object by merging each product's quantity with its full product details.
 *
 * The input cart contains products with only `productId` and `quantity`. This function finds the full
 * product information from the `products` array by matching `productId` with `product.id`, and combines
 * it with the quantity in the cart.
 *
 * @param cart - A single cart object with minimal product info (each product has `productId` and `quantity`).
 * @param products - A list of full product objects containing detailed information (e.g., title, price, etc.).
 * @returns A new `EnrichedCart` object where each product includes all product fields plus the quantity.
 *
 * @example
 * const cart = {
 *   id: 1,
 *   userId: 2,
 *   products: [
 *     { productId: 3, quantity: 2 },
 *     { productId: 5, quantity: 1 }
 *   ]
 * };
 *
 * const products = [
 *   { id: 3, title: "Watch", price: 99.99, ... },
 *   { id: 5, title: "Shoes", price: 49.99, ... }
 * ];
 *
 * const enriched = getEnrichedCart(cart, products);
 * // enriched.products now contains:
 * // [
 * //   { id: 3, title: "Watch", price: 99.99, ..., quantity: 2 },
 * //   { id: 5, title: "Shoes", price: 49.99, ..., quantity: 1 }
 * // ]
 */
const getEnrichedCart = (cart: Cart, products: Product[]) => {
  const enrichedCart: EnrichedCart = {
    ...cart,
    products: cart?.products.map((item) => {
      const fullProduct = products?.find((p) => p.id === item.productId);
      return {
        ...fullProduct,
        quantity: item.quantity,
      };
    }),
  }
  return enrichedCart
}

export default getEnrichedCart
