import { Injectable } from "@nestjs/common";

import { UsersRepository } from "@modules/users/repositories/users.repository";

import { TasksUsersRepository } from "../repositories/tasks-users.repository";
import { TasksRepository } from "../repositories/tasks.repository";
import { AlreadyAssigned } from "./errors/already-assigned";
import { TaskNotFound } from "./errors/task-not-found";
import { UserNotFound } from "./errors/user-not-found";

interface AssignTaskToUserRequest {
  taskId: string;
  userId: string;
}

@Injectable()
export class AssignTaskToUserUseCase {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository,
    private readonly tasksUsersRepository: TasksUsersRepository
  ) {}

  async execute({ taskId, userId }: AssignTaskToUserRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new TaskNotFound();
    }

    const alreadyAssigned =
      await this.tasksUsersRepository.findByTaskIdAndUserId(userId, taskId);

    if (alreadyAssigned) {
      throw new AlreadyAssigned();
    }

    await this.tasksUsersRepository.save(userId, taskId);
  }
}
