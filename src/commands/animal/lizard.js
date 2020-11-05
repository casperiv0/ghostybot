const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "lizard",
  description: "Shows a picture of a lizard",
  category: "animal",
  async execute(_bot, message) {
    const data = await fetch(
      "https://nekos.life/api/v2/img/lizard"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
