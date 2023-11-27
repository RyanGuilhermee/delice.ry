FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder usr/src/app/dist ./dist
COPY --from=builder usr/src/app/prisma ./prisma
COPY --from=builder usr/src/app/.env ./.env

COPY package*.json ./

RUN npm install --omit=dev 

EXPOSE 3000

CMD ["npm", "run", "start:migrate:prod"]

