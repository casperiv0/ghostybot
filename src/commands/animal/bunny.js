const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "bunny",
  description: "Shows a picture of a bunny",
  category: "animal",
  async execute(bot, message) {
    const data = await fetch(
      "https://api.bunnies.io/v2/loop/random/?media=gif,png"
    ).then((res) => res.json());

    const embed = BaseEmbed()
      .setDescription(
        `[Click here if the image failed to load.](${data.media.gif})`
      )
      .setImage(`${data.media.gif}`);

    message.channel.send(embed);
  },
};
