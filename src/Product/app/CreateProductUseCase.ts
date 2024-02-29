import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";
import { NotificationProductUSeCase } from "./Services/NotificationNewProduct";

export class CreateProductUseCase {
  constructor(
    readonly productRepository: ProductRepository,
    readonly sendNotification: NotificationProductUSeCase
  ) {}

  async run(
    name: string,
    description: string,
    price: number
  ): Promise<Product | null> {
    const prod = new Product(0, name, description, price);
    try {
      const product = await this.productRepository.createProduct(prod);
      if (product)
        this.sendNotification.run(product);
      return product;
    } catch (error) {
      return null;
    }
  }
}
