const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "slap",
  description: "Slap somebody",
  category: "image",
  async execute(bot, message) {
    const data = await fetch("https://nekos.life/api/v2/img/slap").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const slapped = message.author.id === user.id ? "themselfs" : user.username;

    const embed = BaseEmbed(message)
      .setTitle(`${message.author.username} Slapped ${slapped}`)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send({ embed });
  },
};
