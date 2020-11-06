const BaseEmbed = require("../../modules/BaseEmbed");
const { getGuildById } = require("../../utils/functions");

module.exports = {
  name: "suggest",
  description: "Create a suggestion",
  category: "util",
  async execute(bot, message, args) {
    const suggestion = args.join(" ");
    const guild = await getGuildById(message.guild.id);
    const suggestChannel = guild?.suggest_channel;

    if (!suggestChannel) {
      return message.channel.send(
        "Your server doesn't have a default suggestion channel! \n Use `set suggest-channel <channel mention>` to set the default channel."
      );
    }

    if (!suggestion) return message.reply("Please provide a suggestion");

    const embed = BaseEmbed(message)
      .setTitle("New Suggestion")
      .setDescription(suggestion)
      .setAuthor(`Created by ${message.author.tag}`);

    const sendMessage = await bot.channels.cache
      .get(suggestChannel)
      .send(embed);

    sendMessage.react("👍");
    sendMessage.react("👎");
  },
};
