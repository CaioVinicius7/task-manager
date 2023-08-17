import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const getTaskByIdSchema = z.object({
  id: z
    .string({
      required_error: "Id is required."
    })
    .uuid({
      message: "Id should be a valid uuid."
    })
});

export class GetTaskByIdDTO extends createZodDto(getTaskByIdSchema) {}
