import { TransformStream } from "node:stream/web";
import type { Bot } from "structures/Bot";
import type { ApiRequest } from "types/ApiRequest";
import { createServer } from "node:http";
import { parse } from "node:url";
import next from "next";

export default (bot: Bot) => {
  const dev = process.env["DEV_MODE"] === "true";
  const app = next({ dev });
  const handle = app.getRequestHandler();

  // @ts-expect-error this is a "polyfill" to fix "TransformStream is not defined".
  global.TransformStream = TransformStream;

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
