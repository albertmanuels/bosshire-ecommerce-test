import { Product } from "./product";

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
  } & Product)[];
};

