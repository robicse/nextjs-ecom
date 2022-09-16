FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -f
COPY . .
EXPOSE 300
CMD ["npm", "run", "dev"]