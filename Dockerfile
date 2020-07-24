FROM node:12

WORKDIR /app/

ARG GOOGLE_CREDS
ARG GOOGLE_APPLICATION_CREDENTIALS
ARG PORT

RUN yarn config set "strict-ssl" false --global && \
  yarn config set registry https://artifactory.ap.org/api/npm/npm/ --global

COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

EXPOSE $PORT

RUN echo "$GOOGLE_CREDS" > "$GOOGLE_APPLICATION_CREDENTIALS"

ENTRYPOINT ["bin/harvester"]
CMD ["run"]
