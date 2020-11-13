const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "afk",
  aliases: ["setafk", "makemeafk"],
  category: "util",
  description: "",
  async execute(bot, message, args) {
    const guildId = message.guild.id;
    const userId = message.author.id;
    const lang = await bot.getGuildLang(guildId);
    const { user } = await getUserById(userId, guildId);

    if (user.afk.is_afk) {
      await updateUserById(userId, guildId, {
        afk: { is_afk: false, reason: null },
      });

      const embed = BaseEmbed(message)
        .setTitle(lang.GLOBAL.SUCCESS)
        .setDescription(lang.UTIL.NOT_AFK);

      return message.channel.send(embed);
    }

    const reason = args.join(" ") || lang.GLOBAL.NOT_SPECIFIED;

    await updateUserById(userId, guildId, {
      afk: { is_afk: true, reason: reason },
    });

    const embed = BaseEmbed(message)
      .setTitle(lang.GLOBAL.SUCCESS)
      .setDescription(`${lang.UTIL.AFK}\n**${lang.GLOBAL.REASON}:** ${reason}`);

    message.channel.send(embed);
  },
};
