-- CreateTable
CREATE TABLE "Todo" (
    "todoNo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupNo" INTEGER,
    "flag" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,
    "sort" INTEGER,
    "createDate" DATE,
    "registerDate" DATE
);
