import { Test } from "@nestjs/testing";

import { InMemoryTaskRepository } from "@modules/tasks/repositories/in-memory/tasks.in-memory.repository";
import { TasksRepository } from "@modules/tasks/repositories/tasks.repository";

import { TaskNotFound } from "../errors/task-not-found";
import { UpdateTaskUseCase } from "../update-task";

describe("UpdateTaskUseCase", () => {
  let sut: UpdateTaskUseCase;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateTaskUseCase,
        {
          provide: TasksRepository,
          useClass: InMemoryTaskRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<UpdateTaskUseCase>(UpdateTaskUseCase);
    tasksRepository = moduleRef.get<TasksRepository>(TasksRepository);
  });

  it("Should be able to update a task", async () => {
    const updateTaskSpy = jest.spyOn(tasksRepository, "update");

    const task = await tasksRepository.save({
      title: "New Task",
      description: "Task Description",
      priority: "low",
      status: "todo"
    });

    await sut.execute({
      id: task.id,
      data: {
        title: "Updated title",
        description: "Updated description",
        priority: "high",
        status: "done"
      }
    });

    expect(updateTaskSpy).toHaveBeenCalledWith(task.id, {
      title: "Updated title",
      description: "Updated description",
      priority: "high",
      status: "done"
    });
  });

  it("Should not be able to update a non-existent task", async () => {
    await expect(() =>
      sut.execute({
        id: "fake-task-id",
        data: {
          title: "Updated title"
        }
      })
    ).rejects.toBeInstanceOf(TaskNotFound);
  });
});
