const BaseEmbed = require("../../modules/BaseEmbed");
const { formatDate } = require("../../utils/functions");

module.exports = {
  name: "roleinfo",
  description: "Shows info about a role",
  category: "util",
  aliases: ["role"],
  requiredArgs: ["role"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const role = await bot.findRole(message, args[0]);

    if (!role) {
      return message.channel.send(lang.UTIL.ROLE_NOT_FOUND);
    }

    const { date, tz } = await formatDate(role.createdAt, message.guild?.id);
    const mentionable = role.mentionable ? lang.GLOBAL.YES : lang.GLOBAL.NO;
    const name = role.name;
    const id = role.id;
    const color = role.color || "#2F3136";
    const position = message.guild.roles.cache.size - role.position;

    const embed = bot.utils.baseEmbed(message)
      .setTitle(`**${name}**`)
      .setColor(color)
      .addField(`**${lang.MEMBER.CREATED_ON}**`, `${date} (${tz})`, true)
      .addField(`**${lang.UTIL.MENTIONABLE}**`, mentionable, true)
      .addField(`**${lang.UTIL.POSITION}**`, position, true)
      .addField(`**${lang.MEMBER.ID}**`, id, true);

    message.channel.send(embed);
  },
};
