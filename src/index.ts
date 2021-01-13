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

// require("moment-duration-format");
// require("./modules/command")(bot);
// require("./modules/events")(bot);
// if (dashboard?.enabled) {
//   // require("./server")(bot);
// }

// if (dev === true) {
//   require("./scripts/generateCommandList")(bot);
// }

// if (debug === true) {
//   bot.on("debug", console.log);
// }

bot.login(process.env["DISCORD_BOT_TOKEN"]);

// Unhandled errors
// process.on("unhandledRejection", (error) => sendErrorLog(bot, error, "error"));

// process.on("uncaughtExceptionMonitor", (error) => sendErrorLog(bot, error, "error"));

// process.on("warning", (warning) => {
//   if (warning.stack.startsWith("(node:13988) [DEP0148]")) return;

//   sendErrorLog(bot, warning, "warning");
// });
