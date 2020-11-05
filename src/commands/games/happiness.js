const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "happiness",
  description: "Get a happiness returned",
  category: "games",
  execute(bot, message) {
    const happiness = Math.floor(Math.random() * 100) + 1;

    const embed = BaseEmbed(message)
      .setTitle("Happiness")
      .setDescription(`${happiness}%`);

    message.channel.send(embed);
  },
};
