const { getGuildById, updateGuildById } = require("../../utils/functions");

module.exports = {
  name: "addcmd",
  usage: "addcmd <cmd_name> <cmd_response>",
  description: "add guild custom commands",
  category: "admin",
  botPermissions: ["SEND_MESSAGES"],
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const cmdName = args[0];
    const cmdResponse = args.slice(1).join(" ");

    if (!cmdName) {
      return message.channel.send(
        ":x: You have to give command name, `addcmd <cmd_name> <cmd_response>`"
      );
    }

    if (!cmdResponse) {
      return message.channel.send(
        ":x: You have to give command cmd response, `addcmd <cmd_name> <cmd_response>`"
      );
    }

    const guild = await getGuildById(message.guild.id);
    const commands = guild?.custom_commands;

    if (commands && commands.find((x) => x.name === cmdName.toLowerCase()))
      return message.channel.send(
        ":x: This command name is already added in guild custom commands."
      );

    if (bot.commands.has(cmdName)) {
      return message.channel.send(
        ":x: This command name is already in use by the bot!"
      );
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

    message.channel.send(
      "Added **" + cmdName.toLowerCase() + "** as a custom command in guild."
    );
  },
};
