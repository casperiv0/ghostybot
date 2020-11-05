const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "poke",
  description: "Poke somebody",
  category: "image",
  async execute(bot, message) {
    const data = await fetch("https://nekos.life/api/v2/img/poke").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const poked = message.author.id === user.id ? "themselfs" : user.username;

    const embed = BaseEmbed(message)
      .setTitle(`${message.author.username} Poked ${poked}`)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send({ embed });
  },
};
