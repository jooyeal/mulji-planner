-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "participants" TEXT[],

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);
