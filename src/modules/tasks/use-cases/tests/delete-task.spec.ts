import { Test } from "@nestjs/testing";

import { InMemoryTaskRepository } from "@modules/tasks/repositories/in-memory/tasks.in-memory.repository";
import { TasksRepository } from "@modules/tasks/repositories/tasks.repository";

import { DeleteTaskUseCase } from "../delete-task";
import { TaskNotFound } from "../errors/task-not-found";

describe("CreateTaskUseCase", () => {
  let sut: DeleteTaskUseCase;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteTaskUseCase,
        {
          provide: TasksRepository,
          useClass: InMemoryTaskRepository
        }
      ]
    }).compile();

    sut = moduleRef.get<DeleteTaskUseCase>(DeleteTaskUseCase);
    tasksRepository = moduleRef.get<TasksRepository>(TasksRepository);
  });

  it("Should be able to delete a task", async () => {
    const deleteTaskSpy = jest.spyOn(tasksRepository, "delete");

    const task = await tasksRepository.save({
      title: "New Task",
      description: "Task Description",
      priority: "low",
      status: "todo"
    });

    await sut.execute({
      taskId: task.id
    });

    expect(deleteTaskSpy).toHaveBeenCalledWith(task.id);
  });

  it("Should not be able to delete a non-existent task", async () => {
    await expect(() =>
      sut.execute({
        taskId: "fake-task-id"
      })
    ).rejects.toBeInstanceOf(TaskNotFound);
  });
});
