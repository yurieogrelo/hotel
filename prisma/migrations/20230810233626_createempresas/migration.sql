-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "razaosocial" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cidadeId" INTEGER,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cnpjcpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "razaosocial" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "empresaId" INTEGER,
    "cidadeId" INTEGER,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orcamento" (
    "id" SERIAL NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "empresaId" INTEGER,
    "clienteId" INTEGER,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "preco" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orcamentoId" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "estadoId" INTEGER,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "sigla" TEXT NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_email_key" ON "Empresa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "Orcamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidade" ADD CONSTRAINT "Cidade_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
