const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "panda",
  description: "Shows a picture of a panda",
  category: "animal",
  async execute(_bot, message) {
    const data = await fetch(
      "https://some-random-api.ml/img/panda"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(`[Click here if the image failed to load.](${data.link})`)
      .setImage(`${data.link}`);

    message.channel.send(embed);
  },
};
