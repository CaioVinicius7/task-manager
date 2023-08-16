import { TaskUserRepository } from "../task-user.repository";

export class InMemoryTaskUserRepository implements TaskUserRepository {
  public tasksUsers = [];

  async save(userId: string, taskId: string): Promise<void> {
    this.tasksUsers.push({
      userId,
      taskId
    });
  }
}
