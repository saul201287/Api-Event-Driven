import { Product } from "./Product";

export interface ProductRepository {
  createProduct(product: Product): Promise<Product | null>;
}
