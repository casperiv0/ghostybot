const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "smug",
  description: "Smug",
  category: "image",
  async execute(bot, message) {
    const data = await fetch("https://nekos.life/api/v2/img/smug").then((res) =>
      res.json()
    );

    const embed = BaseEmbed(message)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send({ embed });
  },
};
