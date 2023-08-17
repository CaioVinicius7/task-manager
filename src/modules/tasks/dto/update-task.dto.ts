export interface UpdateTask {
  title?: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  status?: "todo" | "doing" | "done";
  startAt?: Date;
  endAt?: Date;
}
