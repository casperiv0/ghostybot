const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "messageUpdate",
  async execute(bot, oldMsg, newMsg) {
    if (!newMsg.guild) return;
    if (!newMsg.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const w = await oldMsg.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "GhostyBot");

    // Couldn't find webhook/webhook doesn't exist
    if (!webhook) {
      return;
    }

    if (newMsg.author.id === bot.user.id) return;

    if (!oldMsg) {
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(`Message updated in **${newMsg.channel.name}**`)
      .setDescription(`Message send by **${newMsg.author.tag}** was edited`)
      .addField("**Old Message**", oldMsg)
      .addField("**New Message**", newMsg)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed);
  },
};
