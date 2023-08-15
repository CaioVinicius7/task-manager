import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ScheduleModule } from "@nestjs/schedule";

import { PrismaTaskRepository } from "@modules/tasks/repositories/prisma/task.prisma.repository";
import { TaskRepository } from "@modules/tasks/repositories/task.repository";

import { NotificationTaskUserSchedule } from "./notification-task-user.schedule";

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
  controllers: [],
  providers: [
    NotificationTaskUserSchedule,
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository
    }
  ]
})
export class ScheduleTaskModule {}
