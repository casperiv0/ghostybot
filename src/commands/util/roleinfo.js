const BaseEmbed = require("../../modules/BaseEmbed");
const { formatDate } = require("../../utils/functions");

module.exports = {
  name: "roleinfo",
  description: "Shows info about a role",
  category: "util",
  aliases: ["role"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const roles = message.guild.roles.cache;

    const role =
      message.mentions.roles.first() ||
      roles.find((role) => role.name === args[0]) ||
      roles.find((r) => r.id === args[0]);

    if (!role) {
      return message.channel.send(lang.UTIL.ROLE_NOT_FOUND);
    }

    const createdAt = formatDate(role.createdAt);
    const mentionable = role.mentionable
      ? lang.GLOBAL.YES
      : lang.GLOBAL.NO;
    const name = role.name;
    const id = role.id;
    const color = role.color;

    const embed = BaseEmbed(message)
      .setTitle(`**${name}**`)
      .setColor(color)
      .addField(`**${lang.MEMBER.CREATED_ON}**`, createdAt, true)
      .addField(`**${lang.UTIL.MENTIONABLE}**`, mentionable, true)
      .addField(`**${lang.MEMBER.ID}**`, id, true);

    message.channel.send(embed);
  },
};
