const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guilds",
  description: "View all guilds the bot is in",
  category: "botowner",
  ownerOnly: true,
  execute(bot, message) {

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
  }
}
