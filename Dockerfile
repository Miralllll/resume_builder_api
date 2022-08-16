FROM node:12.18.3

LABEL version="1.0"
LABEL description="This is the base docker image for backend API."

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
# RUN npm install
COPY . .

EXPOSE 3040
CMD ["npm", "start"]