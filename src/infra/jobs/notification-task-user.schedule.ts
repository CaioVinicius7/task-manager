import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Cron, CronExpression } from "@nestjs/schedule";

import { TasksRepository } from "@modules/tasks/repositories/tasks.repository";

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(
    @Inject("NOTIFICATION") private readonly notificationClient: ClientProxy,
    private readonly taskRepository: TasksRepository
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getAndSendAllTasksDay() {
    const allTasks = await this.taskRepository.findAllTasksStartInTheDay();

    allTasks.forEach((task) => {
      this.notificationClient.emit("task_notification", task);
    });
  }
}
