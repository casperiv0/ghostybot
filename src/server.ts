import Bot from "./structures/Bot";
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { hiddenBotItems } from "./data/hidden-items";
import ApiRequest from "./interfaces/ApiRequest";

export default (bot: Bot) => {
  const dev = process.env["DEV_MODE"] === "true";
  const app = next({ dev });
  const handle = app.getRequestHandler();

  // eslint-disable-next-line promise/catch-or-return
  app.prepare().then(() => {
    return createServer((req, res) => {
      const parsedUrl = parse(req.url!, true);

      (req as ApiRequest).bot = bot;

      // remove unused items from the bot for dashboard
      hiddenBotItems.forEach((item) => {
        (req as ApiRequest).bot[item] = undefined;
      });

      handle(req, res, parsedUrl);
    }).listen(process.env["DASHBOARD_PORT"], () => {
      bot.logger.log("dashboard", "Dashboard was started");
    });
  });
};
