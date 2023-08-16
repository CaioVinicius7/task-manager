-- DropForeignKey
ALTER TABLE "tasks_users" DROP CONSTRAINT "tasks_users_taskId_fkey";

-- AddForeignKey
ALTER TABLE "tasks_users" ADD CONSTRAINT "tasks_users_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
