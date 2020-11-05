const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "iq",
  description: "Get a random Iq returned",
  category: "games",
  execute(bot, message) {
    const iq = Math.floor(Math.random() * 100) + 1;

    const embed = BaseEmbed(message)
      .setTitle("IQ Test")
      .setDescription(`You're IQ: ${iq}`);

    message.channel.send(embed);
  },
};
