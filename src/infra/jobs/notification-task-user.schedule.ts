import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { TaskRepository } from "@modules/tasks/repositories/task.repository";

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(private readonly taskRepository: TaskRepository) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getAllTasksDay() {
    const tasks = await this.taskRepository.findAllAfterStartDay();

    console.log(tasks);
  }
}
