FROM node:18

WORKDIR /usr/src/app/
ENV NODE_ENV=production
COPY ./package*.json ./
RUN npm install --production
COPY ./ ./
EXPOSE 8000
CMD ["node","index.js"]