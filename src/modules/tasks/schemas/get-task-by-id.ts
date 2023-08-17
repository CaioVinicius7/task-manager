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

export const getTasksByIdResponseSchema = z.object({
  id: z.string({
    invalid_type_error: "Id must be a string."
  }),
  title: z.string({
    invalid_type_error: "Id must be a string."
  }),
  description: z.string({
    invalid_type_error: "Id must be a string."
  }),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "doing", "done"]),
  startAt: z
    .date({
      invalid_type_error: "StartAt must be a date."
    })
    .optional(),
  endAt: z
    .date({
      invalid_type_error: "EndAt must be a date."
    })
    .optional(),
  createdAt: z
    .date({
      invalid_type_error: "CreatedAt must be a date."
    })
    .optional()
});

export class GetTaskByIdResponseDTO extends createZodDto(
  getTasksByIdResponseSchema
) {}
