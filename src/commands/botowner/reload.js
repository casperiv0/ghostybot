module.exports = {
  name: "reload",
  description: "Reloads a command",
  category: "botowner",
  ownerOnly: true,
  execute(bot, message, args) {
    if (!args[0]) {
      return message.channel.send("Please provide a command");
    }

    const cmd = args[0].toLowerCase();

    if (cmd === "all") {
      bot.commands.forEach((c) => {
        if (c.category === "exempt") return;
        delete require.cache[require.resolve(`../${c.category}/${c.name}.js`)];

        setCmd(bot, c);
      });
      return message.channel.send("Reloaded all commands");
    }

    const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

    if (!command) {
      return message.channel.send("Command not found");
    }

    try {
      delete require.cache[require.resolve(`../${command.category}/${command.name}.js`)];
      setCmd(bot, command);
      message.channel.send(`Successfully reload command: \`${command.name}\``);
    } catch (e) {
      bot.logger.error("reload_commands", e?.stack || e);
      return message.channel.send("An error occurred");
    }
  },
};

function setCmd(bot, cmd) {
  const command = require(`../${cmd.category}/${cmd.name}.js`);
  bot.commands.set(command.name, command);
  if (cmd.aliases) {
    for (const alias of cmd.aliases) {
      bot.aliases.set(alias, cmd.name);
    }
  }
}
