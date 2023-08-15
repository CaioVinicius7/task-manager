import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

import { NotificationTaskUserSchedule } from "./notification-task-user.schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [],
  providers: [NotificationTaskUserSchedule]
})
export class ScheduleTaskModule {}
