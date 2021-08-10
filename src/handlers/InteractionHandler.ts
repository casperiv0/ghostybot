import glob from "glob";
import { resolveFile, validateFile } from "utils/HandlersUtil";
import { Bot } from "structures/Bot";
import { Command } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";
import { ApplicationCommandData } from "discord.js";

export class InteractionHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;

    this.createCommand = this.createCommand.bind(this);
  }

  async loadInteractions() {
    try {
      const files = process.env.BUILD_PATH
        ? glob.sync("./dist/src/interactions/**/*.js")
        : glob.sync("./src/interactions/**/*.ts");

      /**
       * object of top-level names and sub commands
       */
      const subCommands: Record<string, SubCommand[]> = {};

      for (const file of files) {
        delete require.cache[file];

        const interaction = await resolveFile<Command | SubCommand>(file, this.bot);
        if (!interaction) continue;
        await validateFile(file, interaction);

        let commandName;

        if (interaction instanceof SubCommand) {
          const topLevelName = interaction.options.commandName;
          const prevSubCommands = subCommands[topLevelName] ?? [];

          subCommands[topLevelName] = [...prevSubCommands, interaction];
          commandName = `${topLevelName}-${interaction.name}`;
        } else {
          commandName = interaction.name;

          const data: ApplicationCommandData = {
            name: interaction.name,
            description: interaction.options.description ?? "Empty description",
            options: interaction.options.options ?? [],
          };

          await this.createCommand(data);
        }

        this.bot.interactions.set(commandName, interaction);

        if (process.env["DEBUG_MODE"] === "true") {
          this.bot.logger.log("COMMAND", `Loaded ${commandName}`);
        }
      }

      for (const topLevelName in subCommands) {
        const cmds = subCommands[topLevelName];

        const data: ApplicationCommandData = {
          name: topLevelName,
          description: `${topLevelName} commands`,
          options: cmds.map((v) => v.options),
        };

        await this.createCommand(data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async createCommand(data: ApplicationCommandData) {
    if (process.env.DEV_MODE === "true") {
      const g = await this.bot.guilds.fetch("841737902065057823");
      await g.commands.create(data).catch(console.error);
    } else {
      await this.bot.application?.commands.create(data);
    }
  }
}
