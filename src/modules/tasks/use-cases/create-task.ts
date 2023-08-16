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
    private readonly tasksRepository: TasksRepository,
    private readonly tasksUsersRepository: TasksUsersRepository
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
    const task = await this.tasksRepository.save({
      title,
      description,
      priority,
      status,
      startAt,
      endAt
    });

    if (userId) {
      await this.tasksUsersRepository.save(userId, task.id);
    }

    return {
      task
    };
  }
}
