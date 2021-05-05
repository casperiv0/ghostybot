import glob from "glob";
import { parse } from "path";
import Bot from "../structures/Bot";
import Feature from "../structures/Feature";

export default class FeatureHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadFeatures() {
    const files = process.env.BUILD_PATH
      ? glob.sync("./dist/src/features/**/*.js")
      : glob.sync("./src/features/**/*.ts");
    const path = process.env.BUILD_PATH ? "../../../" : "../../";

    for (const file of files) {
      delete require.cache[file];
      const { name } = parse(`${path}${file}`);
      const File = await (await import(`${path}${file}`)).default;
      const feature = new File(this.bot, name) as Feature;

      if (!feature.execute) {
        throw new TypeError(
          `[ERROR][FEATURES]: execute function is required for features! (${file})`,
        );
      }

      feature.execute(this.bot);

      if (process.env["DEBUG_MODE"] === "true") {
        this.bot.logger.log("FEATURE", `Loaded ${feature.name}`);
      }
    }
  }
}
