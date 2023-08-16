import { Test } from "@nestjs/testing";

import { InMemoryTaskRepository } from "@modules/tasks/repositories/in-memory/tasks.in-memory.repository";
import { TasksRepository } from "@modules/tasks/repositories/tasks.repository";

import { GetTaskById } from "../get-task-by-id";

describe("GetTaskByIdUseCase", () => {
  let sut: GetTaskById;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetTaskById,
        {
          provide: TasksRepository,
          useClass: InMemoryTaskRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<GetTaskById>(GetTaskById);
    tasksRepository = moduleRef.get<TasksRepository>(TasksRepository);
  });

  it("Should be able get a task by id", async () => {
    const createdTask = await tasksRepository.save({
      title: "New Task",
      description: "Task Description",
      priority: "low",
      status: "todo"
    });

    const task = await sut.execute({
      id: createdTask.id
    });

    expect(task).toEqual({
      id: expect.any(String),
      title: "New Task",
      description: "Task Description",
      priority: "low",
      status: "todo",
      startAt: undefined,
      endAt: undefined,
      createdAt: expect.any(Date)
    });
  });
});
