const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelUpdate",
  async execute(bot, oldChannel, newChannel) {
    if (!oldChannel.guild) return;
    const webhook = await bot.getWebhook(newChannel.guild);
    if (!webhook) return;
    const lang = await bot.getGuildLang(newChannel.guild.id);

    let msg = "";
    const type = newChannel.type === "category" ? "Category" : "Channel";
    if (oldChannel.name !== newChannel.name) {
      msg = lang.EVENTS.CHANNEL_RENAME_MSG.replace("{channel_type}", type)
        .replace("{channel}", oldChannel.name)
        .replace("{new_channel}", newChannel.name);
    } else {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(lang.EVENTS.CHANNEL_RENAME)
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed);
  },
};
