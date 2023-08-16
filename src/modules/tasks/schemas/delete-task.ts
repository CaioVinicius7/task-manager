import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const deleteTaskSchema = z.object({
  taskId: z
    .string({
      required_error: "TaskId is required."
    })
    .uuid({
      message: "TaskId should be a valid uuid."
    })
});

export class DeleteTaskDTO extends createZodDto(deleteTaskSchema) {}
