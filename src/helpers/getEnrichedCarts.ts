import { Cart, EnrichedCart } from '@/types/cart';
import { Product } from '@/types/product';
import { DeepRequired } from '@/types/utils';

/**
 * Returns a cart object enriched with complete product details.
 *
 * This function takes a `cart` whose `products` array contains only `productId` and `quantity`,
 * and replaces each item with the full product data from the `products` list,
 * merging it with the corresponding quantity.
 *
 * Each enriched product in the returned cart includes all required product fields
 * (enforced via `DeepRequired<Product>`) and the original quantity from the cart.
 *
 * If a `productId` in the cart is not found in the provided product list, the function will throw an error.
 *
 * @param cart - A `Cart` object containing product references with only `productId` and `quantity`.
 * @param products - An array of fully detailed `Product` objects used for enrichment.
 * @returns An `EnrichedCart` object where all products are fully populated and include a quantity.
 *
 * @throws Error if a product referenced in the cart cannot be found in the product list.
 *
 * @example
 * const cart = {
 *   id: 2,
 *   userId: 7,
 *   products: [{ productId: 101, quantity: 1 }]
 * };
 *
 * const products = [
 *   { id: 101, title: "Keyboard", price: 49.99, image: "...", ... }
 * ];
 *
 * const enriched = getEnrichedCart(cart, products);
 * // => {
 * //   id: 2,
 * //   userId: 7,
 * //   products: [
 * //     {
 * //       id: 101,
 * //       title: "Keyboard",
 * //       price: 49.99,
 * //       ...,
 * //       quantity: 1
 * //     }
 * //   ]
 * // }
 */

const getEnrichedCart = (cart: Cart, products: Product[] ) => {
  const enrichedCart: EnrichedCart = {
    ...cart,
    products: cart?.products
      .map((item) => {
        const fullProduct = products?.find((p) => p.id === item.productId);
        if (!fullProduct) {
          throw new Error(`Product with id ${item.productId} not found`);
        }
        return {
          ...(fullProduct as DeepRequired<Product>),
          quantity: item.quantity,
        };
      }),
  };
  return enrichedCart;
};

export default getEnrichedCart;
