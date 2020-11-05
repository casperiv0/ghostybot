const { MessageEmbed } = require("discord.js");
const { getUserById } = require("../../utils/functions");

module.exports = {
  name: "level",
  description: "Get your current level",
  category: "levels",
  aliases: ["lvl"],
  async execute(_bot, message) {
    const member = message.mentions.users.first() || message.author;
    const { user } = await getUserById(member.id, message.guild.id);
    const level = Math.floor(0.1 * Math.sqrt(user.xp));

    const embed = new MessageEmbed()
      .setTitle(`${member.username}'s Level`)
      .setColor("BLUE")
      .setDescription(
        `${member.username} is level **${level}** with **${user.xp}xp**`
      )
      .setTimestamp()
      .setFooter(message.author.username);

    message.channel.send({ embed });
  },
};
