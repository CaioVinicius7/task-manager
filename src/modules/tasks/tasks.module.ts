import { Module } from "@nestjs/common";

import { PrismaUsersRepository } from "@modules/users/repositories/prisma/users.prisma.repository";
import { UsersRepository } from "@modules/users/repositories/users.repository";

import { PrismaTasksUsersRepository } from "./repositories/prisma/tasks-users.prisma.repository";
import { PrismaTasksRepository } from "./repositories/prisma/tasks.prisma.repository";
import { TasksUsersRepository } from "./repositories/tasks-users.repository";
import { TasksRepository } from "./repositories/tasks.repository";
import { TasksController } from "./tasks.controller";
import { AssignTaskToUserUseCase } from "./use-cases/assign-task-to-user";
import { CreateTaskUseCase } from "./use-cases/create-task";
import { DeleteTaskUseCase } from "./use-cases/delete-task";
import { GetTaskByIdUseCase } from "./use-cases/get-task-by-id";
import { GetTasksByUserIdUseCase } from "./use-cases/get-tasks-by-user-id";
import { UpdateTaskUseCase } from "./use-cases/update-task";

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    DeleteTaskUseCase,
    GetTasksByUserIdUseCase,
    GetTaskByIdUseCase,
    UpdateTaskUseCase,
    AssignTaskToUserUseCase,
    {
      provide: TasksRepository,
      useClass: PrismaTasksRepository
    },
    {
      provide: TasksUsersRepository,
      useClass: PrismaTasksUsersRepository
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository
    }
  ]
})
export class TasksModule {}
