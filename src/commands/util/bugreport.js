const BaseEmbed = require("../../modules/BaseEmbed");
const { reportsChannelId } = require("../../../config.json");

module.exports = {
  name: "bugreport",
  description: "Report a bug to your staff",
  category: "util",
  execute(bot, message, args) {
    const bug = args.join(" ");

    if (!reportsChannelId) {
      return message.channel.send(
        "reportsChannelId needs to be provided, for this command to work."
      );
    }

    if (!bug) return message.channel.send("Please provide a bug");

    const embed = BaseEmbed(message)
      .setTitle(`${message.author.username} has reported a bug`)
      .setDescription(bug);

    bot.channels.cache.get(reportsChannelId).send(embed);

    return message.channel.send("Bug report was send!");
  },
};
