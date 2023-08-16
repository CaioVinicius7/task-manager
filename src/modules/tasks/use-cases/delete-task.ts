import { Injectable } from "@nestjs/common";

import { TasksRepository } from "../repositories/tasks.repository";
import { TaskNotFound } from "./errors/task-not-found";

interface DeleteTaskRequest {
  taskId: string;
}

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({ taskId }: DeleteTaskRequest) {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new TaskNotFound();
    }

    await this.tasksRepository.delete(taskId);
  }
}
