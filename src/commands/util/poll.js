const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "poll",
  description: "Create a poll",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const question = args.join(" ");

    if (!question) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    const embed = BaseEmbed(message)
      .setTitle(question)
      .setDescription(
        lang.UTIL.CREATED_BY.replace("{member}", message.author.tag)
      );

    const sendMessage = await message.channel.send(embed);

    sendMessage.react("👍");
    sendMessage.react("👎");
    sendMessage.react("🤷");
  },
};
