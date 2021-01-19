import glob from "glob";
import { Collection } from "discord.js";
import { parse } from "path";
import Bot from "../structures/Bot";
import Command from "../structures/Command";

export default class CommandHandler {
  bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  async loadCommands() {
    const files = glob.sync("./src/commands/**/*.ts");

    for (const file of files) {
      delete require.cache[file];
      const options = parse(`../../${file}`);
      const File = await (await import(`../../${file}`)).default;
      const command = new File(this.bot, options) as Command;

      if (!command.execute) {
        new Error(`[ERROR][COMMANDS]: 'execute' function is required for commands! (${file})`);
        process.exit();
      }

      if (!command.name || command.name === "") {
        new Error(`[ERROR][COMMANDS]: 'name' is required for commands! (${file})`);
        process.exit();
      }

      this.bot.commands.set(command.name, command);

      command.options.aliases?.forEach((alias) => {
        this.bot.aliases.set(alias, command.name);
      });

      if (!this.bot.cooldowns.has(command.name)) {
        this.bot.cooldowns.set(command.name, new Collection());
      }

      if (this.bot.config.debug) {
        this.bot.logger.log("COMMAND", `Loaded ${command.name}`);
      }
    }
  }
}
