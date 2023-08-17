import type { CreatedTaskUser } from "../dto/assign-task-to-user.dto";

export abstract class TasksUsersRepository {
  abstract findByTaskIdAndUserId(
    userId: string,
    taskId: string
  ): Promise<CreatedTaskUser | null>;
  abstract save(userId: string, taskId: string): Promise<void>;
  abstract delete(userId: string, taskId: string): Promise<void>;
}
