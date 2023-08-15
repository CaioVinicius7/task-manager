import { ZodValidationPipe } from "nestjs-zod";

import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { NotificationModule } from "./modules/notifications/notification.module";
import { TasksModule } from "./modules/tasks/tasks.module";
import { UserModule } from "./modules/users/user.module";

@Module({
  imports: [NotificationModule, TasksModule, UserModule, AuthenticationModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    }
  ]
})
export class AppModule {}
