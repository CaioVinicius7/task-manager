import { TasksUsersRepository } from "../tasks-users.repository";

export class InMemoryTasksUsersRepository implements TasksUsersRepository {
  public tasksUsers = [];

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
