/*
  Warnings:

  - The `status` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priority` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'TO_DO',
DROP COLUMN "priority",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'LOW',
ALTER COLUMN "estimated_expenses" DROP NOT NULL,
ALTER COLUMN "final_expenses" DROP NOT NULL,
ALTER COLUMN "has_been_canceled" SET DEFAULT false,
ALTER COLUMN "cancelation_reason" DROP NOT NULL,
ALTER COLUMN "cancelation_reason" SET DATA TYPE TEXT;
