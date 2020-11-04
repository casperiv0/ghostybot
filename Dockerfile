FROM node:latest

# Create dir
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install

COPY . /usr/src/bot

# Start bot
CMD ["node", "src/index.js"]
