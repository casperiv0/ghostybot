const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "flipcoin",
  description: "Flip a coin",
  category: "games",
  execute(bot, message) {
    const replies = ["**You landed on Heads**", "**You landed on Tails**"];

    const reply = replies[Math.floor(Math.random() * replies.length)];

    const embed = BaseEmbed(message)
      .setTitle("Flipcoin")
      .setDescription(`${reply}`);

    message.channel.send(embed);
  },
};
