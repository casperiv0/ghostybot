import { ApplicationCommandData } from "discord.js";
import glob from "glob";
import Interaction from "../structures/Interaction";
import { resolveFile, validateFile } from "../utils/HandlersUtil";
import Bot from "structures/Bot";

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

      for (const file of files) {
        delete require.cache[file];

        const interaction = await resolveFile<Interaction>(file, this.bot);
        if (!interaction) continue;
        await validateFile(file, interaction);

        this.bot.interactions.set(interaction.name, interaction);

        const data: ApplicationCommandData = {
          name: interaction.name,
          description: interaction.options.description ?? "Empty description",
          options: interaction.options.options ?? [],
        };

        const g = await this.bot.guilds.fetch("841737902065057823");
        g.commands.create(data);

        // await this.bot.application?.commands.create(data);

        if (process.env["DEBUG_MODE"] === "true") {
          this.bot.logger.log("COMMAND", `Loaded ${interaction.name}`);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
