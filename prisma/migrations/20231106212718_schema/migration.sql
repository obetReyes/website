/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "hero_title" TEXT NOT NULL,
    "services_title" TEXT NOT NULL,
    "services_description" TEXT NOT NULL,
    "gallery_title" TEXT NOT NULL,
    "contact_title" TEXT NOT NULL,
    "contact_subtitle" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content_Id" INTEGER NOT NULL,
    CONSTRAINT "Service_content_Id_fkey" FOREIGN KEY ("content_Id") REFERENCES "Content" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "content_Id" INTEGER NOT NULL,
    "service_Id" INTEGER,
    CONSTRAINT "Image_service_Id_fkey" FOREIGN KEY ("service_Id") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Image_content_Id_fkey" FOREIGN KEY ("content_Id") REFERENCES "Content" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");
