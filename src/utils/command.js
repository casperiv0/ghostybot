const fs = require("fs");
const { sep } = require("path");

module.exports = (bot) => {
    const dir = "./src/commands";
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}${sep}${dirs}${sep}`).filter(f => f.endsWith(".js"));

        for (const file of commands) {
            const cmd = require(`../commands/${dirs}/${file}`);

            bot.commands.set(cmd.name, cmd)
        }
    })
}