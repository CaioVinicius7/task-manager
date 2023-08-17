import type { CreatedTaskUser } from "@modules/tasks/dto/assign-task-to-user.dto";

import { TasksUsersRepository } from "../tasks-users.repository";

export class InMemoryTasksUsersRepository implements TasksUsersRepository {
  public tasksUsers = [];

  async findByTaskIdAndUserId(
    userId: string,
    taskId: string
  ): Promise<CreatedTaskUser | null> {
    const taskUser = this.tasksUsers.find((taskUser) => {
      return taskUser.userId === userId && taskUser.taskId === taskId;
    });

    return taskUser ?? null;
  }

  async save(userId: string, taskId: string): Promise<void> {
    this.tasksUsers.push({
      userId,
      taskId
    });
  }

  async delete(userId: string, taskId: string): Promise<void> {
    const taskUserIndex = this.tasksUsers.findIndex((taskUser) => {
      return taskUser.userId === userId && taskUser.taskId === taskId;
    });

    if (taskUserIndex >= 0) {
      this.tasksUsers.splice(taskUserIndex, 1);
    }
  }
}
