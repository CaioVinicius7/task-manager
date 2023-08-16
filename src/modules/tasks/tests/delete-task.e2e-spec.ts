import * as request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "@infra/database/database.module";
import { AuthenticationModule } from "@modules/authentication/authentication.module";

import { PrismaTasksUsersRepository } from "../repositories/prisma/tasks-users.prisma.repository";
import { PrismaTasksRepository } from "../repositories/prisma/tasks.prisma.repository";
import { TasksUsersRepository } from "../repositories/tasks-users.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { TasksController } from "../tasks.controller";
import { CreateTaskUseCase } from "../use-cases/create-task";
import { DeleteTaskUseCase } from "../use-cases/delete-task";

describe("[DELETE] /tasks/:taskId", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthenticationModule, DatabaseModule],
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
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be delete a task", async () => {
    const newUser = {
      name: "Caio",
      username: `Caio-${Math.random() * 10000}`,
      email: `${Math.random() * 10000}@gmail.com`,
      password: "@SuperSecret123"
    };

    await request(app.getHttpServer()).post("/users").send(newUser);

    const {
      body: { accessToken }
    } = await request(app.getHttpServer()).post("/sign-in").send({
      username: newUser.username,
      password: newUser.password
    });

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
      .delete(`/tasks/${task.id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(statusCode).toEqual(204);
  });
});