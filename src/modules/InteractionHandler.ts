import { ApplicationCommandData } from "discord.js";
import glob from "glob";
import { parse } from "path";
import Bot from "../structures/Bot";
import Interaction from "../structures/Interaction";

export default class InteractionHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadInteractions() {
    try {
      const files = process.env.BUILD_PATH
        ? glob.sync("./dist/src/interactions/**/*.js")
        : glob.sync("./src/interactions/**/*.ts");

      const path = process.env.BUILD_PATH ? "../../../" : "../../";

      for (const file of files) {
        delete require.cache[file];
        const options = parse(`${path}${file}`);
        const File = await (await import(`${path}${file}`)).default;
        const interaction = new File(this.bot, options) as Interaction;

        if (!interaction.execute) {
          new Error(
            `[ERROR][INTERACTIONS]: 'execute' function is required for interactions! (${file})`,
          );
          process.exit();
        }

        if (!interaction.name) {
          new Error(`[ERROR][INTERACTIONS]: 'name' is required for interactions! (${file})`);
          process.exit();
        }

        this.bot.interactions.set(interaction.name, interaction);

        const data: ApplicationCommandData = {
          name: interaction.name,
          description: interaction.options.description ?? "Empty description",
          options: interaction.options.options ?? [],
        };

        await this.bot.application?.commands.create(data);

        if (process.env["DEBUG_MODE"] === "true") {
          this.bot.logger.log("COMMAND", `Loaded ${interaction.name}`);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
