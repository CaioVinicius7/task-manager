import { Injectable } from "@nestjs/common";

import { TaskUserRepository } from "../repositories/task-user.repository";
import { TaskRepository } from "../repositories/task.repository";

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
    private readonly taskRepository: TaskRepository,
    private readonly taskUserRepository: TaskUserRepository
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
