import { Module } from "@nestjs/common";

import { PrismaTasksUsersRepository } from "./repositories/prisma/tasks-users.prisma.repository";
import { PrismaTasksRepository } from "./repositories/prisma/tasks.prisma.repository";
import { TasksUsersRepository } from "./repositories/tasks-users.repository";
import { TasksRepository } from "./repositories/tasks.repository";
import { TasksController } from "./tasks.controller";
import { CreateTaskUseCase } from "./use-cases/create-task";
import { DeleteTaskUseCase } from "./use-cases/delete-task";
import { GetTaskById } from "./use-cases/get-task-by-id";
import { GetTasksByUserId } from "./use-cases/get-tasks-by-user-id";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    DeleteTaskUseCase,
    GetTasksByUserId,
    GetTaskById,
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
