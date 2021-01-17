import "dotenv/config";
import "./utils/checkValid";
require("./utils/database");
import logs from "discord-logs";
import Bot from "./structures/Bot";
import "moment-duration-format";

const bot = new Bot();
logs(bot);

if (bot.config.dashboard.enabled) {
  import("./server").then((v) => v.default(bot));
}

if (bot.config.debug === true) {
  bot.on("debug", console.log);
}

bot.login(process.env["DISCORD_BOT_TOKEN"]);

// Unhandled errors
process.on("unhandledRejection", (error: Error) => bot.utils.sendErrorLog(error, "error"));

process.on("uncaughtExceptionMonitor", (error) => bot.utils.sendErrorLog(error, "error"));

process.on("warning", (warning) => {
  bot.utils.sendErrorLog(warning, "warning");
});
