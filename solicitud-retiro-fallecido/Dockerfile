# command docker build -t sample:dev .
# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json .

# set up private repository 
# see others to token https://dev.azure.com/DA-ISW/ATO.Framework-de-Desarrollo/_packaging?_a=connect&feed=
# BASE64_ENCODED_PERSONAL_ACCESS_TOKEN https://dev.azure.com/DA-ISW/_usersSettings/tokens
COPY npmrc.docker .npmrc

#install dependences
RUN npm install

# add app
COPY . .

# start app
CMD ["npm", "start"]