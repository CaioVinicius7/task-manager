import { Injectable } from "@nestjs/common";

import { TasksRepository } from "../repositories/tasks.repository";
import { TaskNotFound } from "./errors/task-not-found";

interface GetTasksByIdRequest {
  id: string;
}

@Injectable()
export class GetTaskByIdUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({ id }: GetTasksByIdRequest) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new TaskNotFound();
    }

    return {
      task
    };
  }
}
