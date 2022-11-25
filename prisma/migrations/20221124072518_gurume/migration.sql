-- CreateTable
CREATE TABLE "Gurume" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "mainmenu" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Gurume_pkey" PRIMARY KEY ("id")
);
