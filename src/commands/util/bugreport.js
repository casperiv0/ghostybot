const BaseEmbed = require("../../modules/BaseEmbed");
const { reportsChannelId } = require("../../../config.json");

module.exports = {
  name: "bugreport",
  description: "Report a bug to your staff",
  category: "util",
  cooldown: 300,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const bug = args.join(" ");

    if (!reportsChannelId) {
      return message.channel.send(
        lang.CONFIG.OPTION_CMD_WORK.replace(
          "{option}",
          "reportsChannelId"
        )
      );
    }

    if (!bug) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    const embed = BaseEmbed(message)
      .setTitle(
        lang.UTIL.BUG_REPORT.replace("{member}", message.author.tag)
      )
      .setDescription(bug);

    bot.channels.cache.get(reportsChannelId).send(embed);

    return message.channel.send(lang.UTIL.BUG_REPORTED);
  },
};
