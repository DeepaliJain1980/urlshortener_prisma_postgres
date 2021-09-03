/*
  Warnings:

  - A unique constraint covering the columns `[short_url]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url.short_url_unique" ON "Url"("short_url");
