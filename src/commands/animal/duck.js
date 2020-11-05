const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "duck",
  description: "Shows a picture of a duck",
  category: "animal",
  async execute(_bot, message) {
    const data = await fetch(
      "https://random-d.uk/api/v1/random?type=gif"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
