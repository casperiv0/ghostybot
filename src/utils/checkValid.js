const config = require("../../config.json");
const chalk = require("chalk");
const fs = require("fs");

// Runs checks to see if config is valid
function checkValid() {
  const v = parseFloat(process.versions.node);

  if (v < 14) {
    throw Error(
      "[ERROR]: This bot requires version 14 of nodejs! Please upgrade to version 14"
    );
  }

  if (config.token === "") {
    throw Error("[ERROR][BOT]: Bot token is required");
  }

  if (config.mongodbUri === "") {
    throw Error("[ERROR][BOT]: mongoUri is required");
  }

  if (config.youtubeApiKey === "") {
    throw Error("[ERROR][BOT]: Youtube API token is required");
  }

  if (config.ownerId === "") {
    console.warn(
      chalk.yellow("[WARNING][BOT]: ownerId is required for bot-owner commands")
    );
  }

  if (config.reportsChannelId === "") {
    console.warn(
      chalk.yellow(
        "[WARNING][BOT]: reportsChannelId is required for the bugreport command"
      )
    );
  }

  if (config.imdbKey === "") {
    console.warn(
      chalk.yellow("[WARNING][BOT]:   imdbKey is required for the imdb command")
    );
  }

  if (config.feedBackChannelId === "") {
    console.warn(
      chalk.yellow(
        "[WARNING][BOT]: feedBackChannelId is required for the feedback command"
      )
    );
  }

  if (config.openWeatherMapKey === "") {
    console.warn(
      chalk.yellow(
        "[WARNING][BOT]: openWeatherMapKey is required for the weather command"
      )
    );
  }

  if (config.giphyApiKey === "") {
    console.warn(
      chalk.yellow(
        "[WARNING][BOT]: giphyApiKey is required for the giphy command"
      )
    );
  }

  fs.stat("src/data/giveaways.json", (e) => {
    if (e === "ENOENT") {
      throw Error("[ERROR]: File: src/data/giveaway.json is required.");
    }
  });
}

module.exports = checkValid;
