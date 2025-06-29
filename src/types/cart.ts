import { Product } from "./product";
import { DeepRequired } from "./utils";

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: Array<{
    productId: number,
    quantity: number
  }>
}

export type EnrichedCart = {
  id: number;
  userId: number;
  date: string;
  products: ({
    quantity: number;
  } & DeepRequired<Product>)[];
};

