FROM node:lts-alpine

WORKDIR /myapp

# Copy the current directory contents into the container at /ksuf
COPY . /myapp
RUN npm install
RUN npm build
# COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]