import amqplib from "amqplib";

import { Product } from "../../domain/Product";
import { INotificationNewProduct } from "../../domain/Services/INotificationNewProduct";

export class NotificationNewProduct implements INotificationNewProduct {
  private options: any;
  private url: any;
  private exch: any;
  private routingKey: any;

  constructor() {
    this.options = {
      username: process.env.AMQP_USERNAME,
      password: process.env.AMQP_PASSWORD,
    };
    this.url = process.env.AMQP_URL;
    this.exch = process.env.AMQP_EXCH;
    this.routingKey = process.env.AMQP_ROUTING_KEY;
    //Options solo para cloudamqp
    //this.server = process.env.AMQP_SERVER;
  }

  async sendNotification(product: Product): Promise<boolean> {
    try {
      const conn = await amqplib.connect(this.url, this.options);
      const ch = await conn.createChannel();
      ch.assertExchange(this.exch, "direct", { durable: true });

      // Publicar el mensaje con una clave de enrutamiento válida
      const status = ch.publish(
        this.exch,
        this.routingKey || "12345",
        Buffer.from(
          JSON.stringify({
            idPay: product.id,
            product: product.name,
            date: "2017/01/11",
            price: product.price,
          })
        )
      );
      console.log(status);
      
      return status;
    } catch (error) {
      console.error("Error al enviar la notificación:", error);
      return false;
    }
  }
}
