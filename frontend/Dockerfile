FROM node:18

WORKDIR /app 

COPY package*.json ./ 

RUN yarn install 

COPY . .

RUN yarn run build:css 
 
CMD ["yarn", "run", "start"]
