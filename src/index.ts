import "dotenv/config";
// require("./utils/checkValid")();
require("./utils/database");
import logs from "discord-logs";
import Bot from "./structures/Bot";
import "moment-duration-format";

const bot = new Bot();
logs(bot);

// global.Promise = require("bluebird");
// Promise.config({
//   longStackTraces: true,
// });

// require("./modules/command")(bot);
// require("./modules/events")(bot);
// if (dashboard?.enabled) {
//   // require("./server")(bot);
// }

if (bot.config.dashboard.enabled) {
  import("./server").then((v) => v.default(bot));
}

if (bot.config.dev === true) {
  import("./scripts/generateCommandList").then((v) => v.default(bot));
}

if (bot.config.debug === true) {
  bot.on("debug", console.log);
}

bot.login(process.env["DISCORD_BOT_TOKEN"]);

// Unhandled errors
process.on("unhandledRejection", (error) => bot.utils.sendErrorLog(error, "error"));

process.on("uncaughtExceptionMonitor", (error) => bot.utils.sendErrorLog(error, "error"));

process.on("warning", (warning) => {
  bot.utils.sendErrorLog(warning, "warning");
});
