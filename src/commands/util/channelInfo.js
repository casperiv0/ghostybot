const BaseEmbed = require("../../modules/BaseEmbed");
const { formatDate } = require("../../utils/functions");

module.exports = {
  name: "channelinfo",
  description: "Get information about a channel",
  category: "util",
  aliases: ["channel"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    let channel = message.mentions.channels.first();

    if (!channel) {
      if (parseInt(args[0]) < 9223372036854775807n) {
        channel = message.guild.channels.cache.get(args[0]);
      } else channel = message.channel;
    }

    const topic = channel.topic ? channel.topic : "N/A";
    const channelId = channel.id;
    const createdAt = formatDate(channel.createdAt);
    const type =
      channel.type === "text"
        ? lang.UTIL.TEXT_CHANNEL
        : lang.UTIL.VOICE_CHANNEL;

    const embed = BaseEmbed(message)
      .setTitle(`${channel.name}`)
      .addField(lang.BOT_OWNER.EVAL_TYPE, type, true)
      .addField(lang.UTIL.CHANNEL_TOPIC, topic, true)
      .addField(lang.MEMBER.ID, channelId, true)
      .addField(lang.MEMBER.CREATED_ON, createdAt, true);

    message.channel.send(embed);
  },
};
