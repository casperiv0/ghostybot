const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "koala",
  description: "Shows a random picture of koala",
  category: "animal",
  async execute(_bot, message) {
    const data = await fetch(
      "https://some-random-api.ml/img/koala"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(`[Click here if the image failed to load.](${data.link})`)
      .setImage(`${data.link}`);

    message.channel.send(embed);
  },
};
