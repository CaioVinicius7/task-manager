/*
  Warnings:

  - A unique constraint covering the columns `[taskId,userId]` on the table `tasks_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tasks_users_taskId_userId_key" ON "tasks_users"("taskId", "userId");
