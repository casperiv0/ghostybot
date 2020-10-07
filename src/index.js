require("./utils/checkValid")();
const chalk = require("chalk");
const { Collection, Client } = require("discord.js");
const bot = new Client({ disableMentions: "everyone" });
const { token, imdbKey } = require("../config.json");
const { GiveawaysManager } = require("discord-giveaways");
const imdb = require("imdb-api");
const NekoClient = require("nekos.life");
const neko = new NekoClient();
const client = require("tnai");
const tnai = new client();
// Commands
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.neko = neko;
bot.tnai = tnai;
bot.imdb = new imdb.Client({ apiKey: imdbKey });
require("./utils/command")(bot);

const giveawayManager = new GiveawaysManager(bot, {
  storage: "src/data/giveaways.json",
  updateCountdownEvery: 10000,
  default: {
    embedColor: "BLUE",
    botsCanWin: false,
    reaction: "🎉",
    embedColorEnd: "BLUE",
  },
});

bot.giveawayManager = giveawayManager;

// events
require("./utils/events")(bot);

bot.login(token);

// Unhandled errors
process.on("unhandledRejection", (error) =>
  console.error(chalk.redBright(`Uncaught Error ${error}`))
);

process.on("uncaughtExceptionMonitor", (error) => {
  console.error(chalk.redBright(`Uncaught Exception ${error}`));
});

process.on("warning", (warning) => {
  console.warn(chalk.yellow(`Warning ${warning}`));
});
