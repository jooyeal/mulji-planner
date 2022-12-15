-- CreateTable
CREATE TABLE "WishList" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "WishList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "isPurchased" BOOLEAN NOT NULL,
    "listId" INTEGER NOT NULL,

    CONSTRAINT "WishItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WishItem" ADD CONSTRAINT "WishItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "WishList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
