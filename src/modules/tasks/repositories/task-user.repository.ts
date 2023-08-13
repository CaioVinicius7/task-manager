export abstract class TaskUserRepository {
  abstract save(userId: string, taskId: string): Promise<void>;
}
