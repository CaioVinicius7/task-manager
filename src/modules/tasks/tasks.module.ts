import { Module } from "@nestjs/common";

import { PrismaTaskUserRepository } from "./repositories/prisma/task-user.prisma.repository";
import { PrismaTaskRepository } from "./repositories/prisma/task.prisma.repository";
import { TaskUserRepository } from "./repositories/task-user.repository";
import { TaskRepository } from "./repositories/task.repository";
import { TasksController } from "./tasks.controller";
import { CreateTaskUseCase } from "./use-cases/create-task";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    {
      provide: TaskRepository,
      useClass: PrismaTaskRepository
    },
    {
      provide: TaskUserRepository,
      useClass: PrismaTaskUserRepository
    }
  ]
})
export class TasksModule {}
