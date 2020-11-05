const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "birb",
  description: "Shows a picture of a birb",
  category: "animal",
  async execute(bot, message) {
    const data = await fetch("https://api.alexflipnote.dev/birb").then((res) =>
      res.json()
    );

    const embed = BaseEmbed(message)
      .setDescription(`[Click here if the image failed to load.](${data.file})`)
      .setImage(`${data.file}`);

    message.channel.send(embed);
  },
};
