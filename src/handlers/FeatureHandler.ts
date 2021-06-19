import glob from "glob";
import Bot from "structures/Bot";
import Feature from "structures/Feature";
import { resolveFile, validateFile } from "./HandlersUtil";

export default class FeatureHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadFeatures() {
    const files = process.env.BUILD_PATH
      ? glob.sync("./dist/src/features/**/*.js")
      : glob.sync("./src/features/**/*.ts");

    for (const file of files) {
      delete require.cache[file];

      const feature = await resolveFile<Feature>(file, this.bot);

      await validateFile(file, feature);

      try {
        feature.execute();
      } catch (e) {
        this.bot.utils.sendErrorLog(e, "error");
      }

      if (process.env["DEBUG_MODE"] === "true") {
        this.bot.logger.log("FEATURE", `Loaded ${feature.name}`);
      }
    }
  }
}
