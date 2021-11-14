import glob from "glob";
import {} from "distube";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";
import { resolveFile, validateFile } from "utils/HandlersUtil";

const types = ["channel", "client", "guild", "message", "player", "sb"];

export class EventHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadEvents() {
    let type = "Bot";

    const files = process.env.BUILD_PATH
      ? glob.sync("./dist/src/events/**/*.js")
      : glob.sync("./src/events/**/*.ts");

    for (const file of files) {
      delete require.cache[file];

      const event = await resolveFile<Event>(file, this.bot);
      if (!event) continue;
      await validateFile(file, event);

      const isPlayer = file.includes("player.");

      types.forEach((t) => {
        if (file.includes(`${t}.`)) {
          type = t;
        }
      });

      if (!event.execute) {
        throw new TypeError(`[ERROR][events]: execute function is required for events! (${file})`);
      }

      if (isPlayer) {
        this.bot.player.on(event.name as any, event.execute.bind(null, this.bot));
      } else if (event.once) {
        this.bot.once(event.name, event.execute.bind(null, this.bot));
      } else {
        this.bot.on(event.name, event.execute.bind(null, this.bot));
      }

      if (process.env["DEBUG_MODE"] === "true") {
        this.bot.logger.log("EVENT", `${type}: Loaded ${event.name}`);
      }
    }
  }
}
