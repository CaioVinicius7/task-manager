import * as request from "supertest";

import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { DatabaseModule } from "@infra/database/database.module";
import { AuthenticationModule } from "@modules/authentication/authentication.module";

import { PrismaTaskUserRepository } from "../repositories/prisma/task-user.prisma.repository";
import { PrismaTaskRepository } from "../repositories/prisma/task.prisma.repository";
import { TaskUserRepository } from "../repositories/task-user.repository";
import { TaskRepository } from "../repositories/task.repository";
import { TasksController } from "../tasks.controller";
import { CreateTaskUseCase } from "../use-cases/create-task";

describe("[POST] /tasks", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthenticationModule, DatabaseModule],
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
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be create a task", async () => {
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

    const { statusCode, body } = await request(app.getHttpServer())
      .post("/tasks")
      .send(newTask)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(statusCode).toEqual(201);
    expect(body.task).toEqual({
      id: expect.any(String),
      title: newTask.title,
      description: newTask.description,
      priority: "high",
      status: "todo",
      startAt: null,
      endAt: null,
      createdAt: expect.any(String)
    });
  });
});
