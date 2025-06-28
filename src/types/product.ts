import { DeepRequired } from "./utils";

export type Product = {
  id?: number;
  title?: string;
  price?: number;
  image?: string;
  quantity?: number;
  category?: string;
  description?: string; 
  rating?: {
    rate?: number;
    count?: number
  }
}

export type CartProduct = DeepRequired<Product>