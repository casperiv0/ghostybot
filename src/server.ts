import { Bot } from "structures/Bot";
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { ApiRequest } from "types/ApiRequest";

export default (bot: Bot) => {
  const dev = process.env["DEV_MODE"] === "true";
  const app = next({ dev });
  const handle = app.getRequestHandler();

  app
    .prepare()
    .then(() => {
      return createServer((req, res) => {
        const parsedUrl = parse(req.url!, true);

        (req as ApiRequest).bot = bot;

        handle(req, res, parsedUrl);
      }).listen(process.env["DASHBOARD_PORT"], () => {
        bot.logger.log("dashboard", "Dashboard was started");
      });
    })
    .catch(console.error);
};
