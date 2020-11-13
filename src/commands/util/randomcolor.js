const randomColor = require("randomcolor");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "randomcolor",
  description: "Get a random color",
  category: "util",
  aliases: ["color"],
  execute(bot, message) {
    const color = randomColor();

    const embed = BaseEmbed(message)
      .setColor(color)
      .setTitle(color);

    message.channel.send(embed);
  },
};
