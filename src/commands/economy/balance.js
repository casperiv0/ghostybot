const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById } = require("../../utils/functions");

module.exports = {
  name: "balance",
  description: "balance",
  category: "economy",
  aliases: ["bal"],
  async execute(bot, message, args) {
    const member = bot.findMember(message, args, true);
    const { user } = await getUserById(member.id, message.guild.id);

    const embed = BaseEmbed(message)
      .setTitle(`${member.user.username}'s Balance`)
      .addField("Pocket:", user.money)
      .addField("Bank", user.bank);

    message.channel.send(embed);
  },
};
