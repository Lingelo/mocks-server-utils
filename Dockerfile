FROM openjdk:11

LABEL image-name mockserver-utils
LABEL maintainer angelomiguellima@gmail.com

RUN apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_9.x | bash - \
  && apt-get install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh

ENV appDir /app

EXPOSE 1080

RUN mkdir ${appDir}

WORKDIR ${appDir}

COPY package.json mocks-server.properties ${appDir}/
COPY src ${appDir}/src
COPY mocks ${appDir}/mocks

RUN chmod -x ${appDir}

RUN npm install --unsafe-perm

ENTRYPOINT npm start | npm run init:mocks
