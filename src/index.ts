import P from "bluebird";
import parseDotenv from "dotenv-parse-variables";

P.Promise.config({
  longStackTraces: true,
  warnings: true,
});

import dotenv from "dotenv";

let env = dotenv.config({});
if (env.error) throw env.error;
env = parseDotenv(env.parsed);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.env = { ...process.env, ...env } as any;

import "./utils/checkValid";
require("./utils/database");
import logs from "discord-logs";
import Bot from "./structures/Bot";
import "moment-duration-format";

const bot = new Bot();
logs(bot);

if (process.env["DASHBOARD_ENABLED"] === true) {
  import("./server").then(v => v.default(bot));
}

if (process.env["DEBUG_MODE"] === true) {
  bot.on("debug", console.log);
}

bot.login(process.env["DISCORD_BOT_TOKEN"]);

// Unhandled errors
process.on("unhandledRejection", (error: Error) => bot.utils.sendErrorLog(error, "error"));

process.on("uncaughtExceptionMonitor", error => bot.utils.sendErrorLog(error, "error"));

process.on("warning", warning => {
  bot.utils.sendErrorLog(warning, "warning");
});
