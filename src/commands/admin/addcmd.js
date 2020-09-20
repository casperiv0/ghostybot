const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { getModLog } = require("../../utils/functions");

module.exports = {
  name: "addcmd",
  usage: "addcmd <cmd_name> <cmd_response>",
  description: "add guild custom commands",
  category: "admin",
  execute(bot, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        ":x: You need `MANAGE_MESSAGES` perms to use this command"
      );

    const cmdName = args[0];

    if (!cmdName)
      return message.channel.send(
        ":x: You have to give command name, `addcmd <cmd_name> <cmd_response>`"
      );

    const cmdResponse = args.slice(1).join(" ");

    if (!cmdResponse)
      return message.channel.send(
        ":x: You have to give command cmd response, `addcmd <cmd_name> <cmd_response>`"
      );

    const database = db.get(`cmds_${message.guild.id}`);

    if (database && database.find((x) => x.name === cmdName.toLowerCase()))
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

    db.push(`cmds_${message.guild.id}`, data);

    message.channel.send(
      "Added **" + cmdName.toLowerCase() + "** as a custom command in guild."
    );

    const modLog = getModLog(message.guild.id);
    const embed = new MessageEmbed()
      .setTitle("ACTION: `addcmd`")
      .setDescription(`MODERATOR: ${message.author.username}`)
      .setColor("ORANGE");
    if (modLog !== null) {
      bot.channels.cache.get(modLog.id).send(embed);
    }
  },
};
