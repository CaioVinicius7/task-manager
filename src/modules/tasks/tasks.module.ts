import { Module } from "@nestjs/common";

import { PrismaTasksUsersRepository } from "./repositories/prisma/tasks-users.prisma.repository";
import { PrismaTasksRepository } from "./repositories/prisma/tasks.prisma.repository";
import { TasksUsersRepository } from "./repositories/tasks-users.repository";
import { TasksRepository } from "./repositories/tasks.repository";
import { TasksController } from "./tasks.controller";
import { CreateTaskUseCase } from "./use-cases/create-task";
import { DeleteTaskUseCase } from "./use-cases/delete-task";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    DeleteTaskUseCase,
    {
      provide: TasksRepository,
      useClass: PrismaTasksRepository
    },
    {
      provide: TasksUsersRepository,
      useClass: PrismaTasksUsersRepository
    }
  ]
})
export class TasksModule {}
