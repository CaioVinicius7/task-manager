import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const deleteTaskSchema = z.object({
  id: z
    .string({
      required_error: "Id is required."
    })
    .uuid({
      message: "Id should be a valid uuid."
    })
});

export class DeleteTaskDTO extends createZodDto(deleteTaskSchema) {}
