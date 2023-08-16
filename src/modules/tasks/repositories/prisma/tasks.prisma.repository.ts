import { Injectable } from "@nestjs/common";

import { endOfDay, startOfDay } from "@utils/date";
import { PrismaService } from "@infra/database/prisma.service";
import type {
  CreateTask,
  CreatedTask,
  TaskWithUsers
} from "@modules/tasks/dto/create-task.dto";

import { TasksRepository } from "../tasks.repository";

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
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

  async findAllTasksStartInTheDay(): Promise<TaskWithUsers[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        startAt: {
          gte: startOfDay(),
          lte: endOfDay()
        }
      },
      include: {
        TaskUser: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    const formattedUser = tasks.map((task) => {
      return {
        id: task.id,
        title: task.title,
        description: task.description,
        startAt: task.startAt,
        endAt: task.endAt,
        priority: task.priority,
        status: task.status,
        users: task.TaskUser.map((taskUser) => taskUser.user)
      };
    });

    return formattedUser;
  }
}
