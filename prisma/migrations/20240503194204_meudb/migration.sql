-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "consumidor" TEXT NOT NULL,
    "nunerro" TEXT NOT NULL,
    "datass" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);
