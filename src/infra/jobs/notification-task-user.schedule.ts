import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Cron, CronExpression } from "@nestjs/schedule";

import { TasksRepository } from "@modules/tasks/repositories/tasks.repository";

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(
    @Inject("NOTIFICATION") private readonly notificationClient: ClientProxy,
    private readonly tasksRepository: TasksRepository
  ) {}

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_09_30AM)
  async getAndSendAllTasksDay() {
    const allTasks = await this.tasksRepository.findAllTasksStartInTheDay();

    allTasks.forEach((task) => {
      this.notificationClient.emit("task_notification", task);
    });
  }
}
