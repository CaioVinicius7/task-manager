import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "@infra/providers/auth-guard";

import { CreateTaskDTO } from "./schemas/create-task";
import { DeleteTaskDTO } from "./schemas/delete-task";
import { GetTaskByUserIdDTO } from "./schemas/get-by-user-id";
import { CreateTaskUseCase } from "./use-cases/create-task";
import { DeleteTaskUseCase } from "./use-cases/delete-task";
import { GetTasksByUserId } from "./use-cases/get-tasks-by-user-id";

@Controller("/tasks")
@UseGuards(AuthGuard)
@ApiTags("Tasks")
@ApiBearerAuth()
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly getTasksByUserId: GetTasksByUserId
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

  @Get("/user/:userId")
  async getByUserId(@Param() { userId }: GetTaskByUserIdDTO) {
    const tasks = await this.getTasksByUserId.execute({
      userId
    });

    return {
      tasks
    };
  }

  @Delete("/:taskId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() { taskId }: DeleteTaskDTO) {
    return this.deleteTaskUseCase.execute({
      taskId
    });
  }
}
