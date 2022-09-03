# specify a parent docker image
FROM node:17-alpine

LABEL description="This is the base docker image for backend API."

# below all runs from this directory
WORKDIR /apps

# This is here because of below layer !
COPY package.json .

# runs --- packadge.json dependences
# run this up here because of layer caching
# we do not ned it to run everytime again
RUN npm install

# copy all our source files too
# not node_modules (.dockerignore)
COPY . .

# COPY ["package.json", "package-lock.json", "./"]

EXPOSE 3040

CMD ["npm", "start"]