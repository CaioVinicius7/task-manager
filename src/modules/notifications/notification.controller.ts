import { Controller, Post, Inject, HttpCode, HttpStatus } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller("/notifications")
export class NotificationController {
  constructor(
    @Inject("NOTIFICATION") private readonly notificationClient: ClientProxy
  ) {}

  @Post("/send-notification")
  @HttpCode(HttpStatus.OK)
  sendNotification() {
    this.notificationClient.emit("task_notification", {
      message: "Olá"
    });
  }
}
