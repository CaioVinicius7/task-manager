import { randomUUID } from "node:crypto";

import { Test } from "@nestjs/testing";

import { InMemoryTasksUsersRepository } from "@modules/tasks/repositories/in-memory/tasks-users.in-memory.repository";
import { InMemoryTaskRepository } from "@modules/tasks/repositories/in-memory/tasks.in-memory.repository";
import { TasksUsersRepository } from "@modules/tasks/repositories/tasks-users.repository";
import { TasksRepository } from "@modules/tasks/repositories/tasks.repository";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/users.in-memory.repository";
import { UsersRepository } from "@modules/users/repositories/users.repository";

import { NotAssigned } from "../errors/not-assigned";
import { TaskNotFound } from "../errors/task-not-found";
import { UserNotFound } from "../errors/user-not-found";
import { UnassignTaskFromUserUseCase } from "../unassign-task-from-user";

describe("UnassignTaskToUserUseCase", () => {
  let sut: UnassignTaskFromUserUseCase;
  let tasksRepository: TasksRepository;
  let usersRepository: UsersRepository;
  let tasksUsersRepository: TasksUsersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UnassignTaskFromUserUseCase,
        {
          provide: TasksRepository,
          useClass: InMemoryTaskRepository
        },
        {
          provide: TasksUsersRepository,
          useClass: InMemoryTasksUsersRepository
        },
        {
          provide: UsersRepository,
          useClass: InMemoryUsersRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<UnassignTaskFromUserUseCase>(
      UnassignTaskFromUserUseCase
    );
    tasksRepository = moduleRef.get<TasksRepository>(TasksRepository);
    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    tasksUsersRepository =
      moduleRef.get<TasksUsersRepository>(TasksUsersRepository);

    tasksUsersRepository.findByTaskIdAndUserId = jest
      .fn()
      .mockImplementation((userId, taskId) => {
        return {
          id: randomUUID(),
          taskId,
          userId,
          createdAt: new Date()
        };
      });
  });

  it("Should be able to unassign a task to a user", async () => {
    const unassignTaskSpy = jest.spyOn(tasksUsersRepository, "delete");

    const createdUser = await usersRepository.save({
      name: "Caio",
      username: "CaioVinícius7",
      email: "caio@gmail.com",
      password: "@SuperSecret123"
    });

    const createdTask = await tasksRepository.save({
      title: "New Task",
      description: "Task Description",
      priority: "low",
      status: "todo"
    });

    await sut.execute({
      userId: createdUser.id,
      taskId: createdTask.id
    });

    expect(unassignTaskSpy).toHaveBeenCalledWith(
      createdUser.id,
      createdTask.id
    );
  });

  it("Should not be able to unassign a non-existent user", async () => {
    await expect(() =>
      sut.execute({
        userId: "fake-id",
        taskId: "fake-id"
      })
    ).rejects.toBeInstanceOf(UserNotFound);
  });

  it("Should not be able to unassign a non-existent task", async () => {
    const createdUser = await usersRepository.save({
      name: "Caio",
      username: "CaioVinícius7",
      email: "caio@gmail.com",
      password: "@SuperSecret123"
    });

    await expect(() =>
      sut.execute({
        userId: createdUser.id,
        taskId: "fake-id"
      })
    ).rejects.toBeInstanceOf(TaskNotFound);
  });

  it("Should not be able to unassign with user and a task that are not related", async () => {
    tasksUsersRepository.findByTaskIdAndUserId = jest
      .fn()
      .mockReturnValue(null);

    const createdUser = await usersRepository.save({
      name: "Caio",
      username: "CaioVinícius7",
      email: "caio@gmail.com",
      password: "@SuperSecret123"
    });

    const createdTask = await tasksRepository.save({
      title: "Title",
      description: "Description",
      priority: "high",
      status: "doing"
    });

    await expect(() =>
      sut.execute({
        userId: createdUser.id,
        taskId: createdTask.id
      })
    ).rejects.toBeInstanceOf(NotAssigned);
  });
});
