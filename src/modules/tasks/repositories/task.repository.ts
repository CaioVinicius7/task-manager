import type { CreateTask, CreatedTask } from "../dto/create-task.dto";

export abstract class TaskRepository {
  abstract save(data: CreateTask): Promise<CreatedTask>;
  abstract findAllAfterStartDay(): Promise<CreatedTask[]>;
}
