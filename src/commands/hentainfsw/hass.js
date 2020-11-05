const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "hass",
  description: "None",
  category: "hentainsfw",
  async execute(bot, message) {
    if (!message.channel.nsfw)
      return message.channel.send("This channel is not a NSFW channel!");
    const data = await fetch(
      "https://nekobot.xyz/api/image?type=hass"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(
        `[Click here if the image failed to load.](${data.message})`
      )
      .setImage(`${data.message}`);

    message.channel.send(embed);
  },
};
