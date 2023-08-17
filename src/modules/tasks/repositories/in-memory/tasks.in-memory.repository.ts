import { randomUUID } from "node:crypto";

import {
  CreateTask,
  CreatedTask,
  TaskWithUsers
} from "@modules/tasks/dto/create-task.dto";

import { TasksRepository } from "../tasks.repository";

export class InMemoryTaskRepository implements TasksRepository {
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

  async findById(id: string): Promise<CreatedTask | null> {
    const task = await this.tasks.find((task) => task.id === id);

    if (!task) {
      return null;
    }

    return task;
  }

  async findByUserId(_: string): Promise<CreatedTask[]> {
    return [];
  }

  async findAllTasksStartInTheDay(): Promise<TaskWithUsers[]> {
    return [];
  }

  async delete(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
    }
  }
}
