module.exports = {
  name: "unlockchannel",
  description: "Unlock A channel",
  category: "admin",
  usage: "<channel mention | current channel>",
  botPermissions: ["MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_CHANNELS"],
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const channel = message.mentions.channels.first() || message.channel;

    if (channel.permissionsFor(message.guild?.id).has("SEND_MESSAGES") === true) {
      return message.channel.send(lang.ADMIN.CHAN_NOT_LOCK);
    }

    channel.updateOverwrite(message.guild?.id, {
      SEND_MESSAGES: true,
    });
    message.channel.send(lang.ADMIN.SUC_UNLOCK.replace("{channel}", channel));
  },
};
