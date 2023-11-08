-- CreateTable
CREATE TABLE "art" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "art_pkey" PRIMARY KEY ("id")
);
