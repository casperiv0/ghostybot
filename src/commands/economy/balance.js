const { MessageEmbed } = require("discord.js");
const { getUserById } = require("../../utils/functions");

module.exports = {
  name: "balance",
  description: "balance",
  category: "economy",
  aliases: ["bal"],
  async execute(bot, message) {
    const member = message.mentions.users.first() || message.author;
    const { user } = await getUserById(member.id, message.guild.id);

    const embed = new MessageEmbed()
      .setTitle(`${member.username}'s Balance`)
      .setColor("BLUE")
      .addField("Pocket:", user.money)
      .addField("Bank", user.bank);

    message.channel.send(embed);
  },
};
