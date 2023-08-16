import { ZodValidationPipe } from "nestjs-zod";

import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

import { DatabaseModule } from "@infra/database/database.module";
import { ScheduleTaskModule } from "@infra/jobs/schedule.module";

import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { TasksModule } from "./modules/tasks/tasks.module";
import { UserModule } from "./modules/users/users.module";

@Module({
  imports: [
    DatabaseModule,
    ScheduleTaskModule,
    TasksModule,
    UserModule,
    AuthenticationModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe
    }
  ]
})
export class AppModule {}
