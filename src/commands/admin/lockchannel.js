module.exports = {
  name: "lockchannel",
  description: "Lock A channel",
  category: "admin",
  botPermissions: ["MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_CHANNELS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    let lockReason = args.join(" ");
    let channel = message.mentions.channels.first();

    if (channel) {
      lockReason = args.join(" ").slice(22);
    } else {
      channel = message.channel;
    }

    if (
      channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === false
    ) {
      return message.channel.send(lang.ADMIN.CHANNEL_ALREADY_LOCKED);
    }

    if (!lockReason)
      return message.reply(lang.ADMIN.REASON_LOCK_CHANNEL);

    channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false,
    });
    message.channel.send(lang.ADMIN.LOCKED_CHANNEL_REASON.replace("{channel}", channel).replace("{lockReason}", lockReason));
  },
};
