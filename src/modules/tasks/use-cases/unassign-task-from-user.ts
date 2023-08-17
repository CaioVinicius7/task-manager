import { Injectable } from "@nestjs/common";

import { UsersRepository } from "@modules/users/repositories/users.repository";

import { TasksUsersRepository } from "../repositories/tasks-users.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { NotAssigned } from "./errors/not-assigned";
import { TaskNotFound } from "./errors/task-not-found";
import { UserNotFound } from "./errors/user-not-found";

interface UnassignTaskFromUserRequest {
  taskId: string;
  userId: string;
}

@Injectable()
export class UnassignTaskFromUserUseCase {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository,
    private readonly tasksUsersRepository: TasksUsersRepository
  ) {}

  async execute({ taskId, userId }: UnassignTaskFromUserRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new TaskNotFound();
    }

    const assigned = await this.tasksUsersRepository.findByTaskIdAndUserId(
      userId,
      taskId
    );

    if (!assigned) {
      throw new NotAssigned();
    }

    await this.tasksUsersRepository.delete(userId, taskId);
  }
}
