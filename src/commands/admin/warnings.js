const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "warnings",
  description: "Returns how many warnings a user has",
  usage: "<user>",
  category: "admin",
  requiredArgs: ["user"],
  async execute(bot, message, args) {
    const guild = await bot.utils.getGuildById(message.guild.id);
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const member = await bot.utils.findMember(message, args);
    const { warnings } = member;
    const { prefix } = guild;
    const warningNr = args[1];

    if (!member) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
    }

    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }

    const embed = BaseEmbed(message);

    if (warningNr) {
      const warning = warnings?.filter((w, idx) => idx === warningNr - 1)[0];

      if (!warning) {
        return message.channel.send(lang.ADMIN.WARN_NOT_FOUND.replace("{memberTag}", member.user.tag));
      }

      const warnedOn = warning?.date
        ? new Date(warning?.date)?.toLocaleString()
        : "N/A";
      embed
        .setTitle(`${lang.ADMIN.WARNING} ${warningNr}`)
        .addField(`**${lang.EVENTS.REASON}**`, warning?.reason || lang.GLOBAL.NOT_SPECIFIED)
        .addField(`**${lang.ADMIN.WARNED_ON}**`, warnedOn);

      return message.channel.send({ embed });
    }

    embed
      .setTitle(lang.ADMIN.MEMBER_WARNS.replace("{memberTag}", member.user.tag))
      .addField(`**${lang.ADMIN.TOTAL_WARNS}**`, warnings?.length || 0)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(lang.ADMIN.USE_WARNS.replace("{prefix}", prefix));

    message.channel.send({ embed });
  },
};
