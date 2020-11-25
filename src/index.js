require("./utils/checkValid")();
require("./utils/database");
const NekoClient = require("nekos.life");
const TnaiClient = require("tnai");
const imdb = require("imdb-api");
const { Collection, Client } = require("discord.js");
const { token, imdbKey } = require("../config.json");
const { GiveawaysManager } = require("discord-giveaways");
const { Player } = require("discord-player");
const { findMember, getGuildLang, sendErrorLog } = require("./utils/functions");

const bot = new Client({
  disableMentions: "everyone",
  partials: ["GUILD_MEMBER", "MESSAGE", "USER"],
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

global.Promise = require("bluebird");
Promise.config({
  longStackTraces: true,
});

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
process.on("unhandledRejection", (error) => sendErrorLog(bot, error, "error"));

process.on("uncaughtExceptionMonitor", (error) =>
  sendErrorLog(bot, error, "error")
);

process.on("warning", (warning) => sendErrorLog(bot, warning, "warning"));
