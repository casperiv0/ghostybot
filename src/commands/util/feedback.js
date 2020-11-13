const { feedBackChannelId } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "feedback",
  description: "Give feedback about the bot",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const feedback = args.join(" ");

    if (!feedback) return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);

    if (!feedBackChannelId || feedBackChannelId === "") return;

    const embed = BaseEmbed(message)
      .setTitle(lang.UTIL.NEW_FEEDBACK)
      .setDescription(feedback);

    bot.channels.cache.get(feedBackChannelId).send(embed);

    message.channel.send(lang.UTIL.FEEDBACK_SEND);
  },
};
