import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards
} from "@nestjs/common";

import { AuthGuard } from "@infra/providers/auth-guard";

import { CreateTaskDTO } from "./schemas/create-task";
import { DeleteTaskDTO } from "./schemas/delete-task";
import { CreateTaskUseCase } from "./use-cases/create-task";
import { DeleteTaskUseCase } from "./use-cases/delete-task";

@Controller("/tasks")
@UseGuards(AuthGuard)
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  @Post()
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

  @Delete("/:taskId")
  async delete(@Param() { taskId }: DeleteTaskDTO) {
    return this.deleteTaskUseCase.execute({
      taskId
    });
  }
}
