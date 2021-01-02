const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMuteRemove",
  async execute(bot, guild, mute) {
    const webhook = await bot.getWebhook(guild);
   if (!webhook) return;

    const { member, executor } = mute;

    const embed = new MessageEmbed()
      .setTitle("User unmuted")
      .addField("Tag", member.user.tag, true)
      .addField("Executed by", executor.tag, true)
      .setColor("ORANGE");

    return webhook.send(embed);
  },
};
