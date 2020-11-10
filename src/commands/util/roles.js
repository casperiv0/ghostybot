const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "roles",
  description: "Shows all roles from the guild",
  category: "util",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const roles =
      message.guild.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .map((r) => r)
        .join(",\n") || lang.GLOBAL.NONE;

    const embed = BaseEmbed(message)
      .setTitle(`${message.guild.name} ${lang.UTIL.ROLES}`)
      .setDescription(
        `${roles.length > 2048 ? roles.slice(0, 2030) + "..." : roles}`
      );

    message.channel.send(embed);
  },
};
