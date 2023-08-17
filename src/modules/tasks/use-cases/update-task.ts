import { Injectable } from "@nestjs/common";

import { TasksRepository } from "../repositories/tasks.repository";
import { TaskNotFound } from "./errors/task-not-found";

interface UpdateTaskRequest {
  id: string;
  data: {
    title?: string;
    description?: string;
    priority?: "low" | "medium" | "high";
    status?: "todo" | "doing" | "done";
    startAt?: Date;
    endAt?: Date;
  };
}

@Injectable()
export class UpdateTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({ id, data }: UpdateTaskRequest) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new TaskNotFound();
    }

    const updatedTask = await this.tasksRepository.update(id, data);

    return {
      task: updatedTask
    };
  }
}
