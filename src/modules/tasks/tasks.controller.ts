import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { AuthGuard } from "@infra/providers/auth-guard";

import { CreateTaskDTO } from "./schemas/create-task";
import { CreateTaskUseCase } from "./use-cases/create-task";

@Controller("/tasks")
export class TasksController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body()
    {
      title,
      description,
      priority,
      status,
      startAt,
      endAt,
      userId
    }: CreateTaskDTO
  ) {
    return this.createTaskUseCase.execute({
      title,
      description,
      priority,
      status,
      startAt,
      endAt,
      userId
    });
  }
}
