
FROM node

WORKDIR /portfolio-website

COPY package.json package-lock.json ./

RUN npm ci

COPY . .


RUN npm run build

CMD ["npm","run","start"]
