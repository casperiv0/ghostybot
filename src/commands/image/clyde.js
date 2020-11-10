const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "clyde",
  description: "Let clyde say something",
  category: "image",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const text = args.join(" ");
    if (!text) return message.reply("Please provide text");

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setTitle(lang.IMAGE.CLYDE)
      .setImage(data.message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`);

    message.channel.send(embed);
  },
};
