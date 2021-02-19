import { PlayerEvents } from "discord-player";
import glob from "glob";
import { parse } from "path";
import Bot from "../structures/Bot";
import Event from "../structures/Event";

const types = ["channel", "client", "guild", "message", "player", "sb"];

export default class EventHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadEvents() {
    let type = "Bot";
    const files = glob.sync("./src/events/**/*.ts");

    for (const file of files) {
      delete require.cache[file];
      const { name } = parse(`../../${file}`);

      if (!name) {
        throw Error(`[ERROR][EVENT]: event must have a name (${file})`);
      }

      const File = await (await import(`../../${file}`)).default;
      const event = new File(this.bot, name) as Event;
      const isPlayer = file.includes("player.");
      const isStarboard = file.includes("sb.");

      types.forEach((t) => {
        if (file.includes(`${t}.`)) {
          type = t;
        }
      });

      if (!event.execute) {
        throw new TypeError(`[ERROR][events]: execute function is required for events! (${file})`);
      }

      if (isPlayer) {
        this.bot.player.on(event.name as keyof PlayerEvents, event.execute.bind(null, this.bot));
      } else if (isStarboard) {
        (this.bot.starboardsManager as any).on(event.name, event.execute.bind(null, this.bot));
      } else {
        this.bot.on(event.name, event.execute.bind(null, this.bot));
      }

      if (this.bot.config.debug) {
        this.bot.logger.log("EVENT", `${type}: Loaded ${event.name}`);
      }
    }
  }
}
