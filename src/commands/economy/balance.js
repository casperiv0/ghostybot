const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById } = require("../../utils/functions");

module.exports = {
  name: "balance",
  description: "balance",
  category: "economy",
  aliases: ["bal"],
  async execute(bot, message) {
    const member = message.mentions.users.first() || message.author;
    const { user } = await getUserById(member.id, message.guild.id);

    const embed = BaseEmbed(message)
      .setTitle(`${member.username}'s Balance`)
      .addField("Pocket:", user.money)
      .addField("Bank", user.bank);

    message.channel.send(embed);
  },
};
