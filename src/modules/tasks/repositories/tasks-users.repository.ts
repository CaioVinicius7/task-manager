export abstract class TasksUsersRepository {
  abstract save(userId: string, taskId: string): Promise<void>;
  abstract delete(userId: string, taskId: string): Promise<void>;
}
