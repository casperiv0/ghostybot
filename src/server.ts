import Bot from "./structures/Bot";
import { createServer } from "http";
import { parse } from "url";
import next from "next";

export default (bot: Bot) => {
  const config = bot.config;
  const dev = config.dev;
  const app = next({ dev });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url!, true);

      (req as any).bot = bot;

      handle(req, res, parsedUrl);
    }).listen(config.dashboard.port, () => {
      bot.logger.log("dashboard", "Dashboard was started");
    });
  });
};
