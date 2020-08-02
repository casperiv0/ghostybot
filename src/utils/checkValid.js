const config = require("../../config.json");
const chalk = require("chalk");

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

  if (config.prefix === "") {
    throw Error("[ERROR][BOT]: Prefix is required");
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
}

module.exports = checkValid;
