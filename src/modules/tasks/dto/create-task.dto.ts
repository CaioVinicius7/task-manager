export interface CreateTask {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "doing" | "done";
  startAt?: Date;
  endAt?: Date;
}

export interface CreatedTask {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "doing" | "done";
  startAt: Date;
  endAt: Date;
  createdAt: Date;
}
