FROM node:12

WORKDIR /app/

ARG GOOGLE_CREDS
ARG GOOGLE_APPLICATION_CREDENTIALS
ARG PORT

# Configure user
RUN groupadd -g 501 interact && \
  useradd -m -u 501 -g interact interact

COPY . ./

EXPOSE $PORT

RUN chown -R interact:interact .
RUN echo "$GOOGLE_CREDS" > "$GOOGLE_APPLICATION_CREDENTIALS"

USER interact

ENTRYPOINT ["bin/protest-arrests"]
CMD ["run"]
