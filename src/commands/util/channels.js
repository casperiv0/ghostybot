const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "channels",
  description: "Shows all channels in the server",
  category: "util",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const channels = message.guild.channels.cache;
    const voiceChannels = channels
      .filter((channel) => channel.type === "voice")
      .map((channel) => channel.name)
      .join(", ");
    const textChannels = channels
      .filter((channel) => channel.type === "text")
      .map((channel) => `<#${channel.id}>`)
      .join(", ");

    const embed = BaseEmbed(message)
      .setColor("BLUE")
      .setTitle(`${message.guild.name}'s channels`)
      .addField(`**${lang.UTIL.VOICE_CHANNELS}:**`, voiceChannels)
      .addField(`**${lang.UTIL.TEXT_CHANNELS}:**`, textChannels)
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send(embed);
  },
};
