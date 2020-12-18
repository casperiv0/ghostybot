module.exports = {
  name: "ctopic",
  description: "Update the channel topic",
  category: "admin",
  botPermissions: ["MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_CHANNELS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    let channel = message.mentions.channels.first();
    let topic;

    if (!channel) {
      channel = message.channel;
      topic = args.join(" ");
    } else {
      topic = args.slice(1).join(" ").trim();
    }

    if (!topic) return message.reply(lang.ADMIN.C_TOPIC_PROVIDE_TOPIC);

    await channel.setTopic(topic);
    await message.channel.send(lang.ADMIN.C_TOPIC_ADDED);
  },
};
