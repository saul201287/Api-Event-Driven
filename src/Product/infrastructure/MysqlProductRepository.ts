import { query } from "../../database/mysql";
import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class MysqlProductRepository implements ProductRepository {
  async createProduct(prod: Product): Promise<Product | null> {
    let product = null;
    const sql =
      "INSERT INTO product (name, description, price) VALUES (?, ?, ?)";
    const params: any[] = [prod.name, prod.description, prod.price];
    try {
      const [result]: any = await query(sql, params);
      product = new Product(
        result.insertId,
        prod.name,
        prod.description,
        prod.price
      );
    } catch (error) {
      product = null;
    } finally {
      return product;
    }
  }
}
