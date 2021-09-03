-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "original_url" TEXT NOT NULL,
    "short_url" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
