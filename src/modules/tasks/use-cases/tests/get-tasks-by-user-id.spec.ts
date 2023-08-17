import { Test } from "@nestjs/testing";

import { InMemoryTaskRepository } from "@modules/tasks/repositories/in-memory/tasks.in-memory.repository";
import { TasksRepository } from "@modules/tasks/repositories/tasks.repository";

import { GetTasksByUserIdUseCase } from "../get-tasks-by-user-id";

describe("GetTasksByUserIdUseCase", () => {
  let sut: GetTasksByUserIdUseCase;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetTasksByUserIdUseCase,
        {
          provide: TasksRepository,
          useClass: InMemoryTaskRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<GetTasksByUserIdUseCase>(GetTasksByUserIdUseCase);
    tasksRepository = moduleRef.get<TasksRepository>(TasksRepository);
  });

  it("Should be able to get a user tasks", async () => {
    const findByUserIdSpy = jest.spyOn(tasksRepository, "findByUserId");

    const tasks = await sut.execute({
      userId: "fake-user-id"
    });

    expect(Array.isArray(tasks)).toBe(true);
    expect(findByUserIdSpy).toBeCalledWith("fake-user-id");
  });
});
