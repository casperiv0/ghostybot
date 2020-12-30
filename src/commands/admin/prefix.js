const { getGuildById, updateGuildById } = require("../../utils/functions");
const { owners } = require("../../../config.json");

module.exports = {
  name: "prefix",
  description: "Set a prefix for your server",
  category: "exempt",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const prefix = args[0];
    const guild = await getGuildById(message.guild.id);

    if (!prefix)
      return message.channel.send(
        lang.ADMIN.CURRENT_PREFIX.replace("{guildPrefix}", guild.prefix).replace(
          "{guildPrefix}",
          guild.prefix
        )
      );

    if (owners.includes(message.author.id)) {
      setPrefix(message, prefix, lang);
    } else if (message.member.permissions.has(["MANAGE_GUILD"])) {
      setPrefix(message, prefix, lang);
    } else {
      return message.reply(lang.ADMIN.NO_PERMISSIONS);
    }
  },
};

async function setPrefix(message, prefix, lang) {
  await updateGuildById(message.guild.id, { prefix });

  message.channel.send(lang.ADMIN.UPDATE_PREFIX.replace("{prefix}", prefix));
}
