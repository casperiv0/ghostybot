const { Util } = require("discord.js");
const { parse } = require("twemoji-parser");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "enlarge",
  description: "get your emoji enlarged",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const emoji = args[0];
    if (!emoji) {
      return message.channel.send(lang.UTIL.PROVIDE_EMOJI);
    }

    const custom = Util.parseEmoji(emoji);

    const embed = BaseEmbed(message).setTitle(
      lang.UTIL.ENLARGED_EMOJI.replace("{emoji}", emoji)
    );

    if (custom.id) {
      embed.setImage(
        `https://cdn.discordapp.com/emojis/${custom.id}.${
          custom.animated ? "gif" : "png"
        }`
      );
      return message.channel.send(embed);
    } else {
      let parsed = parse(emoji, { assetType: "png" });
      if (!parsed[0]) {
        return message.channel.send(lang.UTIL.INVALID_EMOJI);
      }

      embed.setImage(parsed[0].url);
      return message.channel.send(embed);
    }
  },
};
