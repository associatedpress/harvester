FROM node:14.19.1

WORKDIR /app/

ARG PORT=80

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=$PORT
ENV GOOGLE_APPLICATION_CREDENTIALS=.auth.json

COPY package.json yarn.lock ./

RUN yarn install --production=false

COPY . ./

RUN yarn build

EXPOSE $PORT

ENTRYPOINT ["bin/harvester"]
CMD ["run"]
