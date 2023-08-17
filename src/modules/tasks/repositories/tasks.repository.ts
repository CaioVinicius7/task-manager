import type {
  CreateTask,
  CreatedTask,
  TaskWithUsers
} from "../dto/create-task.dto";

export abstract class TasksRepository {
  abstract save(data: CreateTask): Promise<CreatedTask>;
  abstract findById(id: string): Promise<CreatedTask | null>;
  abstract findByUserId(userId: string): Promise<CreatedTask[]>;
  abstract findAllTasksStartInTheDay(): Promise<TaskWithUsers[]>;
  abstract delete(id: string): Promise<void>;
}
