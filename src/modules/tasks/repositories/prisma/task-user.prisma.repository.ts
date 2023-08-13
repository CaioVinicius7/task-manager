import { Injectable } from "@nestjs/common";

import { PrismaService } from "@infra/database/prisma.service";

import { TaskUserRepository } from "../task-user.repository";

@Injectable()
export class PrismaTaskUserRepository implements TaskUserRepository {
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
