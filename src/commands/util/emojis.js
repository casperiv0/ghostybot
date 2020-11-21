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

    const animatedV =
      animated.join(" ").length > 1024
        ? `${animated.join(" ").slice(1010)}...`
        : animated.join(" ");

    const nonAnimatedV =
      nonAnimated.join(" ").length > 1024
        ? `${nonAnimated.join(" ").slice(1010)}...`
        : nonAnimated.join(" ");

    const embed = BaseEmbed(message)
      .addField(
        `${lang.UTIL.ANIMATED}:`,
        animated.length === 0 ? lang.GLOBAL.NONE : animatedV
      )
      .addField(
        `${lang.UTIL.NON_ANIMATED}:`,
        nonAnimated.length === 0 ? lang.GLOBAL.NONE : nonAnimatedV
      );

    message.channel.send(embed);
  },
};
