const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildKickAdd",
  async execute(bot, guild, kick) {
    const webhook = await bot.getWebhook(guild);
   if (!webhook) return;

    const { member, executor, reason } = kick;

    const embed = new MessageEmbed()
      .setTitle("User Kicked")
      .addField("Tag", member.user.tag, true)
      .addField("Executed by", executor.tag, true)
      .addField("Reason", reason)
      .setColor("ORANGE");

    return webhook.send(embed);
  },
};
