# Create image from alpine:3.5
FROM openjdk:11

## some usefull tags
LABEL image-name mockserver-utils
LABEL maintainer angelomiguellima@gmail.com

# install nodejs
RUN apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_9.x | bash - \
  && apt-get install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh

# Environment variable
ENV appDir /app

# declare ports listening in the container
EXPOSE 1080

# Execute shell command : here create folder /app
RUN mkdir ${appDir}

# declare /app as current default directory
WORKDIR ${appDir}

# Copy all files from "build context" to /app folder
COPY package.json mocks-server.properties ${appDir}/
COPY src ${appDir}/src
COPY mocks ${appDir}/mocks

# fix ownership
RUN chmod -x ${appDir}

# Build the application and clean npm cache
RUN npm install --unsafe-perm

# Declare container startup command
ENTRYPOINT npm start&; npm run init:mocks
