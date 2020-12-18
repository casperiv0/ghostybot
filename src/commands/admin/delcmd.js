const { getGuildById, updateGuildById } = require("../../utils/functions");

module.exports = {
  name: "delcmd",
  usage: "delcmd <cmd_name>",
  description: "Delete the custom commannd",
  category: "admin",
  aliases: ["removecmd"],
  memberPermissions: ["ADMINISTRATOR"],
  requiredArgs: ["command name"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const cmdName = args[0];
    const guild = await getGuildById(message.guild.id);
    const commands = guild?.custom_commands;

    if (commands) {
      const data = commands.find((cmd) => cmd.name === cmdName.toLowerCase());

      if (!data) {
        return message.channel.send(lang.ADMIN.DEL_CMD_NOT_FOUND);
      }

      const filtered = commands.filter((cmd) => cmd.name !== cmdName.toLowerCase());

      await updateGuildById(message.guild.id, {
        custom_commands: filtered,
      });
      return message.channel.send(lang.ADMIN.DEL_CMD_DELETED.replace("{cmd}", cmdName));
    } else {
      return message.channel.send(lang.ADMIN.DEL_CMD_NO_COMMANDS);
    }
  },
};
