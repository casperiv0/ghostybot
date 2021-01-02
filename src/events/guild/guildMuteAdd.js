const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMuteAdd",
  async execute(bot, guild, mute) {
    const webhook = await bot.getWebhook(guild);
   if (!webhook) return;

    const { member, executor, tempMute, time, reason } = mute;

    const embed = new MessageEmbed()
      .setTitle("User muted")
      .addField("Tag", member.user.tag, true)
      .addField("Executed by", executor.tag, true)
      .addField("Reason", reason)
      .setColor("ORANGE");

    if (tempMute) {
      embed.addField("Muted for", time);
    }

    return webhook.send(embed);
  },
};
