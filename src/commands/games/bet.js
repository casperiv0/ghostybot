const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "bet",
  description: "Bet on somebody",
  category: "games",
  execute(bot, message) {
    const member = message.mentions.members.first();

    if (!member) return message.reply("Please provide a user");

    const n = Math.random();

    if (n < 0.5) {
      const embed = BaseEmbed(message)
        .setTitle(`${message.author.username} bets on ${member.user.username}`)
        .setDescription(
          `${message.author.username} bet on ${member.user.username}!\n ${message.author.username} didn't win the bet`
        );

      message.channel.send(embed);
    } else {
      const embed = BaseEmbed(message)
        .setTitle(`${message.author.username} bets on ${member.user.username}`)
        .setDescription(
          `${message.author.username} bet on ${member.user.username} and ${message.author.username} won the bet`
        );

      message.channel.send(embed);
    }
  },
};
