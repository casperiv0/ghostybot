require("./utils/checkValid")();
require("./utils/database");
const { Collection, Client } = require("discord.js");
const { token, imdbKey } = require("../config.json");
const { GiveawaysManager } = require("discord-giveaways");
const NekoClient = require("nekos.life");
const TnaiClient = require("tnai");
const chalk = require("chalk");
const bot = new Client({ disableMentions: "everyone" });
const imdb = require("imdb-api");

const neko = new NekoClient();

const tnai = new TnaiClient();

const { findMember, getGuildLang } = require("./utils/functions");

// Locale - Language
bot.getGuildLang = getGuildLang;

// Commands
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.afk = new Map();
bot.neko = neko;
bot.tnai = tnai;
bot.imdb = new imdb.Client({ apiKey: imdbKey });
bot.findMember = findMember;

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

require("moment-duration-format");
require("./modules/command")(bot);
require("./modules/events")(bot);

bot.login(token);

// Unhandled errors
process.on("unhandledRejection", (error) =>
  console.error(chalk.redBright("Uncaught Error "), error)
);

process.on("uncaughtExceptionMonitor", (error) => {
  console.error(chalk.redBright("Uncaught Exception "), error);
});

process.on("warning", (warning) => {
  console.warn(chalk.yellow("Warning "), warning);
});
