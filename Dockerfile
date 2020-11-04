RUN npm i npm@7.0.8
RUN mv node_modules/npm /usr/local/lib/node_modules/npm
RUN rm -rf /usr/local/lib/node_modules/npm

# Create dir
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install

COPY . /usr/src/bot

# Start bot
CMD ["node", "src/index.js"]
