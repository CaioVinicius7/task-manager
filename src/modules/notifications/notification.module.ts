import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { NotificationController } from "./notification.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "NOTIFICATION",
        transport: Transport.TCP,
        options: {
          port: 3334,
          host: "127.0.0.1"
        }
      }
    ])
  ],
  controllers: [NotificationController],
  providers: []
})
export class NotificationModule {}
