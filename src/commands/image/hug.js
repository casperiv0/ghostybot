const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "hug",
  description: "Shows a picture of people hugging",
  category: "image",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch("https://nekos.life/api/hug").then((res) =>
      res.json()
    );
    const user = message.mentions.users.first() || message.author;
    const hugged = message.author.id === user.id ? "themselfs" : user.username;

    const embed = BaseEmbed(message)
      .setTitle(
        `${message.author.username} ${lang.IMAGE.HUGGED} ${hugged}`
      )
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
