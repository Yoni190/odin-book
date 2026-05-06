/*
  Warnings:

  - The values [REJECTED] on the enum `FollowStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `FollowRequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FollowStatus_new" AS ENUM ('PENDING', 'ACCEPTED');
ALTER TABLE "public"."Follow" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Follow" ALTER COLUMN "status" TYPE "FollowStatus_new" USING ("status"::text::"FollowStatus_new");
ALTER TYPE "FollowStatus" RENAME TO "FollowStatus_old";
ALTER TYPE "FollowStatus_new" RENAME TO "FollowStatus";
DROP TYPE "public"."FollowStatus_old";
ALTER TABLE "Follow" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "FollowRequest" DROP CONSTRAINT "FollowRequest_followerId_fkey";

-- DropForeignKey
ALTER TABLE "FollowRequest" DROP CONSTRAINT "FollowRequest_followingId_fkey";

-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "FollowRequest";

-- DropEnum
DROP TYPE "Status";

-- CreateIndex
CREATE INDEX "Follow_followerId_idx" ON "Follow"("followerId");

-- CreateIndex
CREATE INDEX "Follow_followingId_idx" ON "Follow"("followingId");
