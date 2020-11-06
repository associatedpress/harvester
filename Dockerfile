FROM node:12

WORKDIR /app/

ARG PORT

RUN yarn config set "strict-ssl" false --global && \
  yarn config set registry https://artifactory.ap.org/api/npm/npm/ --global

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build:app

EXPOSE $PORT

ENTRYPOINT ["bin/harvester"]
CMD ["run"]
