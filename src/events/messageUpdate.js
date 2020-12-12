const { MessageEmbed } = require("discord.js");
const { getGuildById } = require("../utils/functions");

module.exports = {
  name: "messageUpdate",
  async execute(bot, oldMsg, newMsg) {
    if (!newMsg.guild) return;
    if (!newMsg.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
      return;
    }
    const webhook = await bot.getWebhook(newMsg.guild);
   if (!webhook) return;
    const guild = await getGuildById(newMsg.guild.id);

    const blacklistedWords = guild.blacklistedwords;

    if (!oldMsg.content || !newMsg.content) {
      return;
    }
    if (newMsg.author?.id === bot.user.id) return;

    if (oldMsg.content === newMsg.content) return;

    if (blacklistedWords !== null && blacklistedWords[0]) {
      blacklistedWords.forEach((word) => {
        if (newMsg.content.toLowerCase().includes(word.toLowerCase())) {
          newMsg.delete();
          return newMsg
            .reply(
              "You used a bad word the admin has set, therefore your message was deleted!"
            )
            .then((msg) => {
              setTimeout(() => {
                msg.delete();
              }, 5000);
            });
        }
      });
    }

    const pOldMsg =
      oldMsg.content.length > 1024
        ? `${oldMsg.content.slice(0, 1010)}...`
        : oldMsg;
    const PNewMsg =
      newMsg.content.length > 1024
        ? `${newMsg.content.slice(0, 1010)}...`
        : newMsg;

    const messageLink = `https://discord.com/channels/${newMsg.guild.id}/${newMsg.channel.id}/${newMsg.id}`;

    const embed = new MessageEmbed()
      .setTitle(`Message updated in **${newMsg.channel.name}**`)
      .setDescription(
        `Message send by **${newMsg.author.tag}** was edited [jump to message](${messageLink})`
      )
      .addField("**Old Message**", `${pOldMsg}`)
      .addField("**New Message**", `${PNewMsg}`)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed);
  },
};
