-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "writer" TEXT NOT NULL,
    "availableDates" TIMESTAMP(3)[],

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);
