import glob from "glob";
import { parse } from "path";
import Bot from "../structures/Bot";
import Helper from "../structures/Helper";

export default class HelperHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadHelpers() {
    const files = glob.sync("./src/helpers/**/*.ts");

    for (const file of files) {
      delete require.cache[file];
      const { name } = parse(`../../${file}`);
      const File = await (await import(`../../${file}`)).default;
      const helper = new File(this.bot, name) as Helper;

      if (!helper.execute) {
        throw new TypeError(
          `[ERROR][Helpers]: execute function is required for helpers! (${file})`
        );
      }

      helper.execute(this.bot);

      if (this.bot.config.debug) {
        this.bot.logger.log("HELPER", `Loaded ${helper.name}`);
      }
    }
  }
}
