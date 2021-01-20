import { Message, TextChannel } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class MessageUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "messageUpdate");
  }

  async execute(bot: Bot, oldMsg: Message, newMsg: Message) {
    try {
      if (!newMsg.guild?.available) return;
      if (!newMsg.guild.me?.hasPermission("MANAGE_WEBHOOKS")) return;
      const webhook = await bot.utils.getWebhook(newMsg.guild);
      if (!webhook) return;
      const guild = await bot.utils.getGuildById(newMsg.guild.id);
      if (!guild) return;

      const blacklistedWords = guild?.blacklistedwords;

      if (!oldMsg.content || !newMsg.content) {
        return;
      }
      if (newMsg.author?.id === bot.user?.id) return;

      if (oldMsg.content === newMsg.content) return;

      if (blacklistedWords !== null && blacklistedWords[0]) {
        blacklistedWords.forEach((word) => {
          if (newMsg.content.toLowerCase().includes(word.toLowerCase())) {
            newMsg.deletable && newMsg.delete();
            return newMsg
              .reply("You used a bad word the admin has set, therefore your message was deleted!")
              .then((msg) => {
                setTimeout(() => {
                  msg.deletable && msg.delete();
                }, 5000);
              });
          }
        });
      }

      const pOldMsg = oldMsg.content.length > 1024 ? `${oldMsg.content.slice(0, 1010)}...` : oldMsg;
      const PNewMsg = newMsg.content.length > 1024 ? `${newMsg.content.slice(0, 1010)}...` : newMsg;

      const messageLink = `https://discord.com/channels/${newMsg.guild.id}/${newMsg.channel.id}/${newMsg.id}`;

      const embed = bot.utils
        .baseEmbed(newMsg)
        .setTitle(`Message updated in **${(newMsg.channel as TextChannel).name}**`)
        .setDescription(
          `Message send by **${newMsg.author.tag}** was edited [jump to message](${messageLink})`
        )
        .addField("**Old Message**", `${pOldMsg}`)
        .addField("**New Message**", `${PNewMsg}`)
        .setColor("ORANGE")
        .setTimestamp();

      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
