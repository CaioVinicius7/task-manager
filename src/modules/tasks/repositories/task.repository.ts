import type {
  CreateTask,
  CreatedTask,
  TaskWithUsers
} from "../dto/create-task.dto";

export abstract class TaskRepository {
  abstract save(data: CreateTask): Promise<CreatedTask>;
  abstract findAllTasksStartInTheDay(): Promise<TaskWithUsers[]>;
}
