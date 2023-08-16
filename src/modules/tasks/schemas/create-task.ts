import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required."
  }),
  description: z.string({
    required_error: "Description is required."
  }),
  priority: z.enum(["low", "medium", "high"], {
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
  }),
  status: z.enum(["todo", "doing", "done"], {
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
  }),
  startAt: z.coerce
    .date({
      invalid_type_error: "StartAt must be a date."
    })
    .optional(),
  endAt: z.coerce
    .date({
      invalid_type_error: "EndAt must be a date."
    })
    .optional(),
  userId: z
    .string({
      invalid_type_error: "UserId must be string"
    })
    .optional()
});

export class CreateTaskDTO extends createZodDto(createTaskSchema) {}
