FROM node:12

WORKDIR /app/

ARG PORT

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

EXPOSE $PORT

ENTRYPOINT ["bin/harvester"]
CMD ["run"]
