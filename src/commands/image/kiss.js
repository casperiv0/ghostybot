const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "kiss",
  description: "Shows a picture of people kissing",
  category: "image",
  async execute(bot, message) {
    const data = await fetch("https://nekos.life/api/kiss").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const kissed = message.author.id === user.id ? "themselfs" : user.username;

    const embed = BaseEmbed(message)
      .setTitle(`${message.author.username} Kissed ${kissed}`)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
