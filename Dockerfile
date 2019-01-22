FROM node:10

WORKDIR /PlaygameRecruitmentTestApp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1212
CMD npm run prod
