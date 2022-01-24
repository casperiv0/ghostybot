import glob from "glob";
import { Bot } from "structures/Bot";
import { Helper } from "structures/Helper";
import { resolveFile, validateFile } from "utils/HandlersUtil";

export class HelperHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadHelpers() {
    const files = process.env.BUILD_PATH
      ? glob.sync("./dist/src/helpers/**/*.js")
      : glob.sync("./src/helpers/**/*.ts");

    for (const file of files) {
      delete require.cache[file];

      const helper = await resolveFile<Helper>(file, this.bot);
      if (!helper) continue;
      await validateFile(file, helper);

      try {
        helper.execute();
      } catch (e) {
        this.bot.utils.sendErrorLog(e, "error");
      }

      if (process.env["DEBUG_MODE"] === "true") {
        this.bot.logger.log("HELPER", `Loaded ${helper.name}`);
      }
    }
  }
}
