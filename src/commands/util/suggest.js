const BaseEmbed = require("../../modules/BaseEmbed");
const { getGuildById } = require("../../utils/functions");

module.exports = {
  name: "suggest",
  description: "Create a suggestion",
  category: "util",
  cooldown: 300,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const suggestion = args.join(" ");
    const guild = await getGuildById(message.guild.id);
    const suggestChannel = guild?.suggest_channel;

    if (!suggestChannel) {
      return message.channel.send(lang.UTIL.NO_SUGG_CHANNEL);
    }

    if (!suggestion) {
      return message.reply(lang.GLOBAL.PROVIDE_ARGS);
    }

    const embed = BaseEmbed(message)
      .setTitle(lang.UTIL.NEW_SUGGESTION)
      .setDescription(suggestion)
      .setAuthor(
        lang.UTIL.CREATED_BY.replace("{member}", message.author.username)
      );

    const sendMessage = await bot.channels.cache
      .get(suggestChannel)
      .send(embed);

    sendMessage.react("👍");
    sendMessage.react("👎");
  },
};
