const fs = require("fs");
const { sep } = require("path");
const chalk = require("chalk");

module.exports = (bot) => {
    const dir = "./src/commands";
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}${sep}${dirs}${sep}`).filter(f => f.endsWith(".js"));

        for (const file of commands) {
            const cmd = require(`../commands/${dirs}/${file}`);

            if (!cmd.name)
                throw new TypeError(`[ERROR]: name is required for commands! (${file})`);

            if (cmd.name.trim() === "")
                throw new TypeError(`[ERROR]: name cannot be empty! (${file})`);

            if (!cmd.category)
                console.warn(chalk.yellow(`[WARNING]: Command: ${cmd.name} will not be shown in the help command because no category is set.`));

            if (cmd.aliases) {
                for (const alias of cmd.aliases) {
                    bot.aliases.set(alias, cmd.name);
                }
            }
            bot.commands.set(cmd.name, cmd);
        }
    });
};