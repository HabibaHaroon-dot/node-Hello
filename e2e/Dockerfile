FROM node:20-alpine
WORKDIR /tests
COPY ../package*.json ./
RUN npm ci -D
COPY . .
CMD ["node","addItem.test.js"]
