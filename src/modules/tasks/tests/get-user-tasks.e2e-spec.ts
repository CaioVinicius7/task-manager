import * as request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "@infra/database/database.module";
import { AuthenticationModule } from "@modules/authentication/authentication.module";
import { createAndAuthNewUser } from "@test/helpers/create-and-auth-new-user";

import { PrismaTasksUsersRepository } from "../repositories/prisma/tasks-users.prisma.repository";
import { PrismaTasksRepository } from "../repositories/prisma/tasks.prisma.repository";
import { TasksUsersRepository } from "../repositories/tasks-users.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { TasksController } from "../tasks.controller";
import { CreateTaskUseCase } from "../use-cases/create-task";
import { DeleteTaskUseCase } from "../use-cases/delete-task";
import { GetTaskByIdUseCase } from "../use-cases/get-task-by-id";
import { GetTasksByUserIdUseCase } from "../use-cases/get-tasks-by-user-id";

describe("[GET] /tasks", () => {
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
        {
          provide: TasksRepository,
          useClass: PrismaTasksRepository
        },
        {
          provide: TasksUsersRepository,
          useClass: PrismaTasksUsersRepository
        }
      ]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be get logged user tasks", async () => {
    const { user, accessToken } = await createAndAuthNewUser(app);

    const newTask = {
      title: "New Task",
      description: "Description",
      priority: "high",
      status: "todo",
      userId: user.id
    };

    await request(app.getHttpServer())
      .post("/tasks")
      .send(newTask)
      .set("Authorization", `Bearer ${accessToken}`);

    const { statusCode, body } = await request(app.getHttpServer())
      .get(`/tasks`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(statusCode).toEqual(200);
    expect(body.tasks[0]).toEqual({
      id: expect.any(String),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: newTask.status,
      startAt: null,
      endAt: null,
      createdAt: expect.any(String)
    });
  });
});
