import { Request } from "express";
import { zodToOpenAPI } from "nestjs-zod";

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";

import { AuthGuard } from "@infra/providers/auth-guard";

import { AssignTaskToUserParamsDTO } from "./schemas/assign-task-to-user";
import {
  CreateTaskDTO,
  createTaskResponseSchema,
  createTaskSchema
} from "./schemas/create-task";
import { DeleteTaskDTO } from "./schemas/delete-task";
import {
  GetTaskByIdDTO,
  getTasksByIdResponseSchema
} from "./schemas/get-task-by-id";
import {
  GetTasksByUserIdDTO,
  getTasksByUserIdResponseSchema
} from "./schemas/get-tasks-by-user-id";
import { getUserTasksResponseSchema } from "./schemas/get-user-tasks";
import {
  UpdateTaskDTO,
  UpdateTaskParamsDTO,
  updateTaskResponseSchema,
  updateTaskSchema
} from "./schemas/update-task";
import { AssignTaskToUserUseCase } from "./use-cases/assign-task-to-user";
import { CreateTaskUseCase } from "./use-cases/create-task";
import { DeleteTaskUseCase } from "./use-cases/delete-task";
import { GetTaskByIdUseCase } from "./use-cases/get-task-by-id";
import { GetTasksByUserIdUseCase } from "./use-cases/get-tasks-by-user-id";
import { UpdateTaskUseCase } from "./use-cases/update-task";

createTaskResponseSchema;
const createTaskSchemaForSwagger = zodToOpenAPI(createTaskSchema);
const createTaskResponseSchemaForSwagger = zodToOpenAPI(
  createTaskResponseSchema
);
const getTasksByIdResponseSchemaForSwagger = zodToOpenAPI(
  getTasksByIdResponseSchema
);
const getTasksByUserIdResponseSchemaForSwagger = zodToOpenAPI(
  getTasksByUserIdResponseSchema
);
const getUserTasksResponseSchemaForSwagger = zodToOpenAPI(
  getUserTasksResponseSchema
);
const UpdateTaskSchemaForSwagger = zodToOpenAPI(updateTaskSchema);
const UpdateTaskResponseSchemaForSwagger = zodToOpenAPI(
  updateTaskResponseSchema
);

@Controller("/tasks")
@UseGuards(AuthGuard)
@ApiTags("Tasks")
@ApiBearerAuth()
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly getTasksByUserIdUseCase: GetTasksByUserIdUseCase,
    private readonly getTaskByIdUseCase: GetTaskByIdUseCase,
    private readonly assignTaskToUserUseCase: AssignTaskToUserUseCase
  ) {}

  @Post()
  @ApiBody({
    schema: createTaskSchemaForSwagger,
    description: "Endpoint to create a new task"
  })
  @ApiResponse({
    status: 201,
    description: "Task created",
    schema: createTaskResponseSchemaForSwagger
  })
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
  @ApiResponse({
    status: 200,
    schema: getUserTasksResponseSchemaForSwagger
  })
  async getUserTasks(@Req() req: Request) {
    return this.getTasksByUserIdUseCase.execute({
      userId: req.user.sub
    });
  }

  @Get("/:id")
  @ApiParam({
    name: "id",
    schema: {
      type: "string",
      description: "Task id"
    }
  })
  @ApiResponse({
    status: 200,
    schema: getTasksByIdResponseSchemaForSwagger
  })
  @ApiResponse({
    status: 404,
    description: "Task not found."
  })
  async getById(@Param() { id }: GetTaskByIdDTO) {
    return this.getTaskByIdUseCase.execute({
      id
    });
  }

  @Get("/user/:userId")
  @ApiParam({
    name: "userId",
    schema: {
      type: "string",
      description: "User id"
    }
  })
  @ApiResponse({
    status: 200,
    schema: getTasksByUserIdResponseSchemaForSwagger
  })
  async getByUserId(@Param() { userId }: GetTasksByUserIdDTO) {
    return this.getTasksByUserIdUseCase.execute({
      userId
    });
  }

  @Post("/:taskId/assign/user/:userId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async assignToUser(@Param() { taskId, userId }: AssignTaskToUserParamsDTO) {
    await this.assignTaskToUserUseCase.execute({
      taskId,
      userId
    });
  }

  @Put("/:id")
  @ApiParam({
    name: "id",
    schema: {
      type: "string",
      description: "Task id"
    }
  })
  @ApiBody({
    schema: UpdateTaskSchemaForSwagger,
    description: "Endpoint to update a task"
  })
  @ApiResponse({
    status: 200,
    description: "Task updated",
    schema: UpdateTaskResponseSchemaForSwagger
  })
  async update(
    @Param() { id }: UpdateTaskParamsDTO,
    @Body()
    { title, description, priority, status, startAt, endAt }: UpdateTaskDTO
  ) {
    return this.updateTaskUseCase.execute({
      id,
      data: {
        title,
        description,
        priority,
        status,
        startAt,
        endAt
      }
    });
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: "id",
    schema: {
      type: "string",
      description: "Task id"
    }
  })
  @ApiResponse({
    status: 204,
    description: "Successfully deleted"
  })
  async delete(@Param() { id }: DeleteTaskDTO) {
    return this.deleteTaskUseCase.execute({
      taskId: id
    });
  }
}
