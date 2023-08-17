import { Injectable } from "@nestjs/common";

import { PrismaService } from "@infra/database/prisma.service";

import { TasksUsersRepository } from "../tasks-users.repository";
import type { CreatedTaskUser } from "@modules/tasks/dto/assign-task-to-user.dto";

@Injectable()
export class PrismaTasksUsersRepository implements TasksUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByTaskIdAndUserId(
    userId: string,
    taskId: string
  ): Promise<CreatedTaskUser | null> {
    const taskUser = await this.prisma.taskUser.findUnique({
      where: {
        taskId_userId: {
          taskId,
          userId
        }
      }
    });

    return taskUser;
  }

  async save(userId: string, taskId: string): Promise<void> {
    await this.prisma.taskUser.create({
      data: {
        userId,
        taskId
      }
    });
  }

  async delete(userId: string, taskId: string): Promise<void> {
    await this.prisma.taskUser.delete({
      where: {
        taskId_userId: {
          taskId,
          userId
        }
      }
    });
  }
}
