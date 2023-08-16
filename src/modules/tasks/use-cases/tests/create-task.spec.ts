import { Test } from "@nestjs/testing";

import { InMemoryTaskUserRepository } from "@modules/tasks/repositories/in-memory/task-user.in-memory.repository";
import { InMemoryTaskRepository } from "@modules/tasks/repositories/in-memory/task.in-memory.repository";
import { TaskUserRepository } from "@modules/tasks/repositories/task-user.repository";
import { TaskRepository } from "@modules/tasks/repositories/task.repository";

import { CreateTaskUseCase } from "../create-task";

describe("CreateTaskUseCase", () => {
  let sut: CreateTaskUseCase;
  let taskUserRepository: TaskUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        {
          provide: TaskRepository,
          useClass: InMemoryTaskRepository
        },
        {
          provide: TaskUserRepository,
          useClass: InMemoryTaskUserRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<CreateTaskUseCase>(CreateTaskUseCase);
    taskUserRepository = moduleRef.get<TaskUserRepository>(TaskUserRepository);
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
    const saveTaskUserSpy = jest.spyOn(taskUserRepository, "save");

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
