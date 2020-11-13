const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "supreme",
  description: "Display custom text as the Supreme logo",
  category: "image",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const text = args.join(" ");

    if (!text) return message.channel.send("Please provide text!");

    const image = `https://api.alexflipnote.dev/supreme?text=${encodeURIComponent(
      text
    )}`;

    const embed = BaseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${image})`)
      .setImage(image);

    message.channel.send(embed);
  },
};
