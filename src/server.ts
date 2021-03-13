import Bot from "./structures/Bot";
import { createServer } from "http";
import { parse } from "url";
import next from "next";

export default (bot: Bot) => {
  const dev = process.env["DEV_MODE"];
  const app = next({ dev });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url!, true);

      (req as any).bot = bot;

      handle(req, res, parsedUrl);
    }).listen(process.env["DASHBOARD_PORT"], () => {
      bot.logger.log("dashboard", "Dashboard was started");
    });
  });
};
