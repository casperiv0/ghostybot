const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "shibe",
  description: "Returns an image of a shibe",
  category: "animal",
  async execute(_bot, message) {
    const data = await fetch("http://shibe.online/api/shibes").then((res) =>
      res.json()
    );

    const embed = BaseEmbed()
      .setDescription(`[Click here if the image failed to load.](${data[0]})`)
      .setImage(`${data[0]}`);

    message.channel.send(embed);
  },
};
