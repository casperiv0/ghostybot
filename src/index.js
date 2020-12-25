require("./utils/checkValid")();
require("./utils/database");
const NekoClient = require("nekos.life");
const TnaiClient = require("tnai");
const imdb = require("imdb-api");
const AlexClient = require("alexflipnote.js");
const { Collection, Client } = require("discord.js");
const { token, imdbKey, alexflipnoteKey, dashboard, dev } = require("../config.json");
const MongoGiveawayManager = require("./modules/GiveawayManager");
const { Player } = require("discord-player");
const logs = require("discord-logs");
const {
  findMember,
  getGuildLang,
  sendErrorLog,
  getWebhook,
  encode,
  getLanguages,
  formatDate,
  getGuildById,
  updateUserById,
  getUserById,
  formatNumber,
} = require("./utils/functions");
const Logger = require("./modules/Logger");

const bot = new Client({
  disableMentions: "everyone",
  fetchAllMembers: true,
  partials: ["GUILD_MEMBER", "MESSAGE", "USER", "REACTION"],
  restRequestTimeout: 25000,
});
logs(bot);

[
  findMember,
  getWebhook,
  encode,
  getGuildLang,
  getLanguages,
  formatDate,
  getGuildById,
  updateUserById,
  getUserById,
  formatNumber,
].forEach((func) => {
  bot[func.name] = func;
});

// Commands
bot.logger = Logger;
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.player = new Player(bot);
bot.afk = new Map();
bot.neko = new NekoClient();
bot.tnai = new TnaiClient();
if (imdbKey) {
  bot.imdb = new imdb.Client({ apiKey: imdbKey });
}
if (alexflipnoteKey) {
  bot.alexClient = new AlexClient(alexflipnoteKey);
}

global.Promise = require("bluebird");
Promise.config({
  longStackTraces: true,
});

const giveawayManager = new MongoGiveawayManager(bot, {
  storage: false,
  updateCountdownEvery: 10000,
  DJSlib: "v12",
  default: {
    embedColor: "#7289DA",
    botsCanWin: false,
    reaction: "🎉",
    embedColorEnd: "#7289DA",
  },
});

bot.giveawayManager = giveawayManager;

require("moment-duration-format");
require("./modules/command")(bot);
require("./modules/events")(bot);
if (dashboard?.enabled) {
  require("./server")(bot);
}

if (dev === true) {
  require("./scripts/generateCommandList")(bot);
}

bot.login(token);

// Unhandled errors
process.on("unhandledRejection", (error) => sendErrorLog(bot, error, "error"));

process.on("uncaughtExceptionMonitor", (error) => sendErrorLog(bot, error, "error"));

process.on("warning", (warning) => {
  if (warning.stack.startsWith("(node:13988) [DEP0148]")) return;

  sendErrorLog(bot, warning, "warning");
});
