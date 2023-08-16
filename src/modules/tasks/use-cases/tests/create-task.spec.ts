import { Test } from "@nestjs/testing";

import { InMemoryTasksUsersRepository } from "@modules/tasks/repositories/in-memory/tasks-users.in-memory.repository";
import { InMemoryTaskRepository } from "@modules/tasks/repositories/in-memory/tasks.in-memory.repository";
import { TasksUsersRepository } from "@modules/tasks/repositories/tasks-users.repository";
import { TasksRepository } from "@modules/tasks/repositories/tasks.repository";

import { CreateTaskUseCase } from "../create-task";

describe("CreateTaskUseCase", () => {
  let sut: CreateTaskUseCase;
  let tasksUsersRepository: TasksUsersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        {
          provide: TasksRepository,
          useClass: InMemoryTaskRepository
        },
        {
          provide: TasksUsersRepository,
          useClass: InMemoryTasksUsersRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<CreateTaskUseCase>(CreateTaskUseCase);
    tasksUsersRepository =
      moduleRef.get<TasksUsersRepository>(TasksUsersRepository);
  });

  it("Should be able to create a new task", async () => {
    const { task } = await sut.execute({
      title: "New Task",
      description: "Task Description",
      priority: "low",
      status: "todo"
    });

    expect(task).toHaveProperty("id");
    expect(task).toHaveProperty("createdAt");
  });

  it("Should be able to create a new task and link to a user", async () => {
    const saveTaskUserSpy = jest.spyOn(tasksUsersRepository, "save");

    const { task } = await sut.execute({
      title: "New Task",
      description: "Task Description",
      priority: "low",
      status: "todo",
      userId: "11cac1d9-d3b0-437b-96f0-ef73828e67b1"
    });

    expect(saveTaskUserSpy).toHaveBeenCalledWith(
      "11cac1d9-d3b0-437b-96f0-ef73828e67b1",
      task.id
    );
  });
});
