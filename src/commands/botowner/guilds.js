const { MessageEmbed } = require("discord.js");
const { ownerId } = require("../../../config.json");

module.exports = {
  name: "guilds",
  description: "View all guilds the bot is in",
  category: "botowner",
  execute(bot, message) {
    if (message.author.id !== ownerId)
      return message.reply("Only the owner is allowed to run this command");

    const guilds = bot.guilds.cache;

    const embed = new MessageEmbed()
      .setTitle(`Guilds for ${bot.user.username}`)
      .setColor("BLUE")
      .setFooter(message.author.tag);

    let description = "";
    guilds.forEach((guild) => {
      description += `**${guild.name}:** Id: ${guild.id}\n`;
    });

    embed.setDescription(description);

    message.channel.send({ embed });
  },
};
