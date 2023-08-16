import { Test } from "@nestjs/testing";

import { InMemoryTaskRepository } from "@modules/tasks/repositories/in-memory/tasks.in-memory.repository";
import { TasksRepository } from "@modules/tasks/repositories/tasks.repository";

import { GetTasksByUserId } from "../get-tasks-by-user-id";

describe("GetTasksByUserIdUseCase", () => {
  let sut: GetTasksByUserId;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetTasksByUserId,
        {
          provide: TasksRepository,
          useClass: InMemoryTaskRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<GetTasksByUserId>(GetTasksByUserId);
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
