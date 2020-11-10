const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "emojis",
  description: "Get a random color",
  category: "util",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const nonAnimated = [];
    const animated = [];

    message.guild.emojis.cache.forEach((e) => {
      if (e.animated) animated.push(e.toString());
      else nonAnimated.push(e.toString());
    });

    const embed = BaseEmbed(message)
      .addField(
        `${lang.UTIL.ANIMATED}:`,
        animated.length === 0 ? lang.GLOBAL.NONE : animated.join(" ")
      )
      .addField(
        `${lang.UTIL.NON_ANIMATED}:`,
        nonAnimated.length === 0 ? lang.GLOBAL.NONE : nonAnimated.join(" ")
      );

    message.channel.send(embed);
  },
};
