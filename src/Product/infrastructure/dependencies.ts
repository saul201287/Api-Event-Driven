import { CreateProductUseCase } from "../app/CreateProductUseCase";
import { NotificationProductUSeCase } from "../app/Services/NotificationNewProduct";
import { CreateProductController } from "./controllers/CreateProductController";
import { MysqlProductRepository } from "./MysqlProductRepository";
import { NotificationNewProduct } from "./servicesRabbitMQ/NotificationNewProduct";

export const mysqlProductRepository = new MysqlProductRepository();
export const servicesNotification = new NotificationNewProduct();
export const serviceNotificationUseCase = new NotificationProductUSeCase(
  servicesNotification
);
export const createProductUseCase = new CreateProductUseCase(
  mysqlProductRepository,
  serviceNotificationUseCase
);

export const createProductController = new CreateProductController(
  createProductUseCase
);
