import { Injectable } from "@nestjs/common";

import { endOfDay, startOfDay } from "@utils/date";
import { PrismaService } from "@infra/database/prisma.service";
import type {
  CreateTask,
  CreatedTask
} from "@modules/tasks/dto/create-task.dto";

import { TaskRepository } from "../task.repository";

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save({
    title,
    description,
    priority,
    status,
    startAt,
    endAt
  }: CreateTask): Promise<CreatedTask> {
    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        startAt,
        endAt
      }
    });

    return task;
  }

  async findAllAfterStartDay(): Promise<CreatedTask[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        startAt: {
          gte: startOfDay(),
          lte: endOfDay()
        }
      }
    });

    return tasks;
  }
}
