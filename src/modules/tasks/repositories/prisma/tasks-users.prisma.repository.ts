import { Injectable } from "@nestjs/common";

import { PrismaService } from "@infra/database/prisma.service";

import { TasksUsersRepository } from "../tasks-users.repository";

@Injectable()
export class PrismaTasksUsersRepository implements TasksUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(userId: string, taskId: string): Promise<void> {
    await this.prisma.taskUser.create({
      data: {
        userId,
        taskId
      }
    });
  }
}
