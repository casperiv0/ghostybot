const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "cat",
  description: "Shows a picture of a cat",
  category: "animal",
  async execute(bot, message) {
    const data = await fetch("https://nekos.life/api/v2/img/meow").then((res) =>
      res.json()
    );

    const embed = BaseEmbed()
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
