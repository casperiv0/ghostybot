const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "fox",
  description: "Shows a picture of a fox",
  category: "animal",
  async execute(_bot, message) {
    const data = await fetch("https://randomfox.ca/floof/").then((res) =>
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
