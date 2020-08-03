require("./utils/checkValid")();
const chalk = require("chalk");
const { Collection, Client } = require("discord.js");
const bot = new Client({ disableMentions: "everyone" });
const { token } = require("../config.json");

// Commands
bot.commands = new Collection();
bot.aliases = new Collection();
require("./utils/command")(bot);

// events
require("./utils/events")(bot);

bot.login(token);

// Unhandled errors
process.on("unhandledRejection", (error) =>
  console.error(chalk.redBright(`Uncaught Error ${error}`))
);
