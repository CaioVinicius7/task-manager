import type {
  CreateTask,
  CreatedTask,
  TaskWithUsers
} from "../dto/create-task.dto";

export abstract class TasksRepository {
  abstract save(data: CreateTask): Promise<CreatedTask>;
  abstract findAllTasksStartInTheDay(): Promise<TaskWithUsers[]>;
}
