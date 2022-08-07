FROM node:16.16.0

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modiles/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

# run package
RUN yarn install

# add app
COPY . ./

# expose port
EXPOSE 8080

# start app
CMD ["yarn", "run", "start"]