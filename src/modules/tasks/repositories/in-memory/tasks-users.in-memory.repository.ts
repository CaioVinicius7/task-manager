import { TasksUsersRepository } from "../tasks-users.repository";

export class InMemoryTasksUsersRepository implements TasksUsersRepository {
  public tasksUsers = [];

  async save(userId: string, taskId: string): Promise<void> {
    this.tasksUsers.push({
      userId,
      taskId
    });
  }
}
