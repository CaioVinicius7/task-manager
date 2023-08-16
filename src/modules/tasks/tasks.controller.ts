import { Request } from "express";

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "@infra/providers/auth-guard";

import { CreateTaskDTO } from "./schemas/create-task";
import { DeleteTaskDTO } from "./schemas/delete-task";
import { GetTaskByIdDTO } from "./schemas/get-by-id";
import { GetTasksByUserIdDTO } from "./schemas/get-tasks-by-user-id";
import { CreateTaskUseCase } from "./use-cases/create-task";
import { DeleteTaskUseCase } from "./use-cases/delete-task";
import { GetTaskById } from "./use-cases/get-task-by-id";
import { GetTasksByUserId } from "./use-cases/get-tasks-by-user-id";

@Controller("/tasks")
@UseGuards(AuthGuard)
@ApiTags("Tasks")
@ApiBearerAuth()
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly getTasksByUserId: GetTasksByUserId,
    private readonly getTaskById: GetTaskById
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

  @Get()
  async getUserTasks(@Req() req: Request) {
    const tasks = await this.getTasksByUserId.execute({
      userId: req.user.sub
    });

    return {
      tasks
    };
  }

  @Get("/:id")
  async getById(@Param() { id }: GetTaskByIdDTO) {
    const task = await this.getTaskById.execute({
      id
    });

    return {
      task
    };
  }

  @Get("/user/:userId")
  async getByUserId(@Param() { userId }: GetTasksByUserIdDTO) {
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
