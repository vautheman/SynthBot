FROM node:18.16-buster
RUN mkdir /usr/src/fabulous
WORKDIR /usr/src/fabulous
COPY package.json /usr/src/fabulous
RUN npm install
COPY . /usr/src/fabulous

ENV TOKEN=DISCORD_TOKEN
ENV LOCALE=LOCALE_LANG

CMD ["npm", "run", "start"]
