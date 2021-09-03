/*
  Warnings:

  - A unique constraint covering the columns `[original_url]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url.original_url_unique" ON "Url"("original_url");
