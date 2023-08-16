import { randomUUID } from "node:crypto";

import {
  CreateTask,
  CreatedTask,
  TaskWithUsers
} from "@modules/tasks/dto/create-task.dto";

import { TaskRepository } from "../task.repository";

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: CreatedTask[] = [];

  async save({
    title,
    description,
    priority,
    status,
    startAt,
    endAt
  }: CreateTask): Promise<CreatedTask> {
    const newTask: CreatedTask = {
      id: randomUUID(),
      title,
      description,
      priority,
      status,
      startAt,
      endAt,
      createdAt: new Date()
    };

    this.tasks.push(newTask);

    return newTask;
  }

  async findAllTasksStartInTheDay(): Promise<TaskWithUsers[]> {
    throw new Error("Method not implemented.");
  }
}
