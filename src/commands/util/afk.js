const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "afk",
  aliases: ["setafk", "makemeafk"],
  category: "util",
  description: "",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (bot.afk.has(message.author.id)) {
      bot.afk.delete(message.author.id);

      const embed = BaseEmbed(message)
        .setTitle(lang.GLOBAL.SUCCESS)
        .setDescription(lang.UTIL.NOT_AFK);

      return message.channel.send(embed);
    }

    const reason = args.join(" ");

    const options = {
      reason: `${reason || lang.GLOBAL.NOT_SPECIFIED}`,
      user_id: message.author.id,
    };

    bot.afk.set(message.author.id, options);

    const embed = BaseEmbed(message)
      .setTitle("Success")
      .setDescription(
        `${lang.UTIL.AFK}\n**${lang.GLOBAL.REASON}:** ${options.reason}`
      );

    message.channel.send(embed);
  },
};
