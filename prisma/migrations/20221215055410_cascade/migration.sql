-- DropForeignKey
ALTER TABLE "WishItem" DROP CONSTRAINT "WishItem_listId_fkey";

-- AddForeignKey
ALTER TABLE "WishItem" ADD CONSTRAINT "WishItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "WishList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
