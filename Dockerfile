# Usa imagem do Node.js
FROM node:22

# Cria diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY package*.json ./
COPY . .

# Instala dependências
RUN npm install

# Expõe a porta (ex: 8123 — você pode trocar no docker-compose)
EXPOSE 8123

# Start da aplicação
CMD ["npm", "start"]
