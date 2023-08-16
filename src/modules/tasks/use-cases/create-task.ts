import { Injectable } from "@nestjs/common";

import { TasksUsersRepository } from "../repositories/tasks-users.repository";
import { TasksRepository } from "../repositories/tasks.repository";

interface CreateTaskRequest {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "doing" | "done";
  startAt?: Date;
  endAt?: Date;
  userId?: string;
}

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TasksRepository,
    private readonly taskUserRepository: TasksUsersRepository
  ) {}

  async execute({
    userId,
    title,
    description,
    priority,
    status,
    startAt,
    endAt
  }: CreateTaskRequest) {
    const task = await this.taskRepository.save({
      title,
      description,
      priority,
      status,
      startAt,
      endAt
    });

    if (userId) {
      await this.taskUserRepository.save(userId, task.id);
    }

    return {
      task
    };
  }
}
