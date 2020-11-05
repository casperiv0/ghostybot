const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "owl",
  description: "Shows a picture of a owl",
  category: "animal",
  async execute(bot, message) {
    const data = await fetch("http://pics.floofybot.moe/owl").then((res) =>
      res.json()
    );

    const embed = BaseEmbed(message)
      .setDescription(
        `[Click here if the image failed to load.](${data.image})`
      )
      .setImage(`${data.image}`);

    message.channel.send(embed);
  },
};
