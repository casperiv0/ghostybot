const fs = require("fs");
const { sep } = require("path");
const chalk = require("chalk");
const { Collection } = require("discord.js");

module.exports = (bot) => {
  const dir = "./src/commands";
  fs.readdirSync(dir).forEach((dirs) => {
    const commands = fs
      .readdirSync(`${dir}${sep}${dirs}${sep}`)
      .filter((f) => f.endsWith(".js"));

    for (const file of commands) {
      const cmd = require(`../commands/${dirs}/${file}`);

      if (!cmd.execute)
        throw new TypeError(
          `[ERROR][COMMANDS]: execute function is required for commands! (${file})`
        );

      if (!cmd.name)
        throw new TypeError(
          `[ERROR][COMMANDS]: name is required for commands! (${file})`
        );

      if (cmd.name.trim() === "")
        throw new TypeError(
          `[ERROR][COMMANDS]: name cannot be empty! (${file})`
        );

      if (!cmd.category)
        console.warn(
          chalk.yellow(
            `[WARNING][COMMANDS]: Command: ${cmd.name} will not be shown in the help command because no category is set.`
          )
        );

      if (cmd.aliases) {
        for (const alias of cmd.aliases) {
          bot.aliases.set(alias, cmd.name);
        }
      }

      bot.commands.set(cmd.name, cmd);

      const cooldowns = bot.cooldowns;

      if (!cooldowns.has(cmd.name)) {
        cooldowns.set(cmd.name, new Collection());
      }
      // debug
      //   console.log(`[INFO][COMMANDS]: Loaded ${cmd.name}`);
    }
  });
};
