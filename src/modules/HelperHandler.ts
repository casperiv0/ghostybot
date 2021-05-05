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
    const files = process.env.BUILD_PATH
      ? glob.sync("./dist/src/helpers/**/*.js")
      : glob.sync("./src/helpers/**/*.ts");
    const path = process.env.BUILD_PATH ? "../../../" : "../../";

    for (const file of files) {
      delete require.cache[file];
      const { name } = parse(`${path}${file}`);
      const File = await (await import(`${path}${file}`)).default;
      const helper = new File(this.bot, name) as Helper;

      if (!helper.execute) {
        throw new TypeError(
          `[ERROR][Helpers]: execute function is required for helpers! (${file})`,
        );
      }

      helper.execute(this.bot);

      if (process.env["DEBUG_MODE"] === "true") {
        this.bot.logger.log("HELPER", `Loaded ${helper.name}`);
      }
    }
  }
}
