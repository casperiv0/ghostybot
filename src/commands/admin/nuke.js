module.exports = {
  name: "nuke",
  description: "Nuke the current channel, delete all messages of the channel",
  usage: "nuke",
  aliases: ["channelnuke"],
  category: "admin",
  botPermissions: ["MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_CHANNELS"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    let channel = message.channel;

    if (!channel) {
      return message.channel.send(lang.GLOBAL.ERROR);
    }

    const position = channel.position;
    const topic = channel.topic;

    const filter = (m) => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, {
      time: 15000,
    });

    message.channel.send(lang.ADMIN.NUKE_CONFIRM);

    collector.on("collect", async (m) => {
      if (m.content?.toLowerCase() === "y") {
        const channel2 = await channel.clone();

        channel2.setPosition(position);
        channel2.setTopic(topic);
        channel.delete();
        channel2.send(lang.ADMIN.NUKE_NUKED);
      } else {
        collector.stop();
        return message.channel.send(lang.ADMIN.NUKE_CANCELED);
      }
    });
  },
};
