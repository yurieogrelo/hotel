# Usa uma imagem base do Node.js
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências de produção e desenvolvimento
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Compila o código TypeScript para JavaScript
RUN npm run build

# Gera o cliente Prisma
RUN npx prisma generate

# Exposição da porta que o aplicativo vai usar
EXPOSE 8000

# Comando para rodar as migrações e iniciar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
