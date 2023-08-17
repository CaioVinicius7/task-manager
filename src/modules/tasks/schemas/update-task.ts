import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const updateTaskParamsSchema = z.object({
  id: z.string().uuid({
    message: "Id must be a valid uuid."
  })
});

export class UpdateTaskParamsDTO extends createZodDto(updateTaskParamsSchema) {}

export const updateTaskSchema = z.object({
  title: z
    .string({
      required_error: "Title is required."
    })
    .optional(),
  description: z
    .string({
      required_error: "Description is required."
    })
    .optional(),
  priority: z
    .enum(["low", "medium", "high"], {
      errorMap: (issue) => {
        switch (issue.code) {
          case "invalid_enum_value": {
            return {
              message: "Priority must be low, medium or high."
            };
          }

          default: {
            return {
              message: "Priority is required."
            };
          }
        }
      }
    })
    .optional(),
  status: z
    .enum(["todo", "doing", "done"], {
      errorMap: (issue) => {
        switch (issue.code) {
          case "invalid_enum_value": {
            return {
              message: "Status must be todo, doing or done."
            };
          }

          default: {
            return {
              message: "Status is required."
            };
          }
        }
      }
    })
    .optional(),
  startAt: z.coerce
    .date({
      invalid_type_error: "StartAt must be a date."
    })
    .optional(),
  endAt: z.coerce
    .date({
      invalid_type_error: "EndAt must be a date."
    })
    .optional()
});

export class UpdateTaskDTO extends createZodDto(updateTaskSchema) {}

export const updateTaskResponseSchema = z.object({
  task: z.object({
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
  })
});

export class UpdateTaskResponseDTO extends createZodDto(
  updateTaskResponseSchema
) {}
