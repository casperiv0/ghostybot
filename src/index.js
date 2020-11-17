require("./utils/checkValid")();
require("./utils/database");
const NekoClient = require("nekos.life");
const TnaiClient = require("tnai");
const chalk = require("chalk");
const imdb = require("imdb-api");
const { Collection, Client } = require("discord.js");
const { token, imdbKey } = require("../config.json");
const { GiveawaysManager } = require("discord-giveaways");
const { Player } = require("discord-player");
const { findMember, getGuildLang } = require("./utils/functions");

const bot = new Client({
  disableMentions: "everyone",
  partials: ["REACTION", "USER", "MESSAGE"],
  ws: {
    intents: [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_MESSAGES",
      "GUILD_BANS",
      "GUILD_WEBHOOKS",
      "GUILD_EMOJIS",
    ],
  },
});

// Locale - Language
bot.getGuildLang = getGuildLang;

// Commands
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.player = new Player(bot);
bot.afk = new Map();
bot.neko = new NekoClient();
bot.tnai = new TnaiClient();
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
