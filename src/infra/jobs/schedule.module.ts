import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { PrismaTaskRepository } from "@modules/tasks/repositories/prisma/task.prisma.repository";
import { TaskRepository } from "@modules/tasks/repositories/task.repository";

import { NotificationTaskUserSchedule } from "./notification-task-user.schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
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
