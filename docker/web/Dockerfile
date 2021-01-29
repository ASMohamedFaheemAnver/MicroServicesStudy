# https://hub.docker.com/

# Specify a base image.
# By default alpine doesn't have node or npm installed
# From alpine
From node:12.20.1-alpine

# Specifying the work directory
# Otherwise it will be copied to root directory
WORKDIR /user/app

# Copying file from build path to docker container.
# We are breaking copy process into 2 just to trick docker cache
# Otherwise everytime we build after some file modification it will trigger 
# npm install
COPY ./package.json ./
# Install dependencies.
RUN npm install

# Copying remaining files.
COPY ./ ./

# Default command.
CMD ["npm", "start"]