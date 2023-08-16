import { Injectable } from "@nestjs/common";

import { TasksRepository } from "../repositories/tasks.repository";

interface GetTasksByUserIdRequest {
  userId: string;
}

@Injectable()
export class GetTasksByUserId {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({ userId }: GetTasksByUserIdRequest) {
    const tasks = await this.tasksRepository.findByUserId(userId);

    return tasks;
  }
}
