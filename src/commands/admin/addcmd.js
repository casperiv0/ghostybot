const { getGuildById, updateGuildById } = require("../../utils/functions");

module.exports = {
  name: "addcmd",
  usage: "addcmd <cmd_name> <cmd_response>",
  description: "add guild custom commands",
  category: "admin",
  memberPermissions: ["ADMINISTRATOR"],
  requiredArgs: ["command name", "command response"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const cmdName = args[0];
    const cmdResponse = args.slice(1).join(" ");

    const guild = await getGuildById(message.guild.id);
    const commands = guild?.custom_commands;

    if (commands && commands.find((x) => x.name === cmdName.toLowerCase())) {
      return message.channel.send(lang.ADMIN.ADD_CMD_ALREADY_EXISTS);
    }

    if (bot.commands.has(cmdName)) {
      return message.channel.send(lang.ADMIN.ADD_CMD_USED_BY_BOT);
    }

    const data = {
      name: cmdName.toLowerCase(),
      response: cmdResponse,
    };

    if (!commands) {
      await updateGuildById(message.guild.id, { custom_commands: [data] });
    } else {
      await updateGuildById(message.guild.id, {
        custom_commands: [...commands, data],
      });
    }

    return message.channel.send(lang.ADMIN.ADD_CMD_ADDED.replace("{name}", cmdName.toLowerCase()));
  },
};
