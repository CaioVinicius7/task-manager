import { Injectable } from "@nestjs/common";

import { TasksRepository } from "../repositories/tasks.repository";

interface GetTasksByIdRequest {
  id: string;
}

@Injectable()
export class GetTaskById {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({ id }: GetTasksByIdRequest) {
    const task = await this.tasksRepository.findById(id);

    return task;
  }
}
