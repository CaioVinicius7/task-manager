import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ScheduleModule } from "@nestjs/schedule";

import { PrismaTasksRepository } from "@modules/tasks/repositories/prisma/tasks.prisma.repository";
import { TasksRepository } from "@modules/tasks/repositories/tasks.repository";

import { NotificationTaskUserSchedule } from "./notification-task-user.schedule";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: "NOTIFICATION",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["127.0.0.1:9092"]
          }
        }
      }
    ])
  ],
  controllers: [],
  providers: [
    NotificationTaskUserSchedule,
    {
      provide: TasksRepository,
      useClass: PrismaTasksRepository
    }
  ]
})
export class ScheduleTaskModule {}
