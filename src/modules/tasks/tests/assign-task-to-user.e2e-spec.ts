import * as request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "@infra/database/database.module";
import { AuthenticationModule } from "@modules/authentication/authentication.module";
import { PrismaUsersRepository } from "@modules/users/repositories/prisma/users.prisma.repository";
import { UsersRepository } from "@modules/users/repositories/users.repository";
import { createAndAuthNewUser } from "@test/helpers/create-and-auth-new-user";

import { PrismaTasksUsersRepository } from "../repositories/prisma/tasks-users.prisma.repository";
import { PrismaTasksRepository } from "../repositories/prisma/tasks.prisma.repository";
import { TasksUsersRepository } from "../repositories/tasks-users.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { TasksController } from "../tasks.controller";
import { AssignTaskToUserUseCase } from "../use-cases/assign-task-to-user";
import { CreateTaskUseCase } from "../use-cases/create-task";
import { DeleteTaskUseCase } from "../use-cases/delete-task";
import { GetTaskByIdUseCase } from "../use-cases/get-task-by-id";
import { GetTasksByUserIdUseCase } from "../use-cases/get-tasks-by-user-id";
import { UnassignTaskFromUserUseCase } from "../use-cases/unassign-task-from-user";
import { UpdateTaskUseCase } from "../use-cases/update-task";

describe("[POST] /tasks/:taskId/assign/user/:userId", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthenticationModule, DatabaseModule],
      controllers: [TasksController],
      providers: [
        CreateTaskUseCase,
        DeleteTaskUseCase,
        GetTasksByUserIdUseCase,
        GetTaskByIdUseCase,
        UpdateTaskUseCase,
        AssignTaskToUserUseCase,
        UnassignTaskFromUserUseCase,
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
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to assign a task to a user", async () => {
    const { user, accessToken } = await createAndAuthNewUser(app);

    const newTask = {
      title: "New Task",
      description: "Description",
      priority: "high",
      status: "todo"
    };

    const {
      body: { task }
    } = await request(app.getHttpServer())
      .post("/tasks")
      .send(newTask)
      .set("Authorization", `Bearer ${accessToken}`);

    const { statusCode } = await request(app.getHttpServer())
      .post(`/tasks/${task.id}/assign/user/${user.id}`)
      .send(newTask)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(statusCode).toEqual(204);
  });
});
