import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

/**
 * @deprecated this event will be deprecated once message intents arrive
 */
export default class MessageUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "messageUpdate");
  }

  async execute(bot: Bot, oldMsg: DJS.Message, newMsg: DJS.Message) {
    try {
      if (!newMsg.guild?.available) return;
      if (!newMsg.guild.me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_WEBHOOKS)) return;

      const webhook = await bot.utils.getWebhook(newMsg.guild);
      if (!webhook) return;
      const guild = await bot.utils.getGuildById(newMsg.guild.id);
      if (!guild) return;

      if (!oldMsg.content || !newMsg.content) {
        return;
      }
      if (newMsg.author?.id === bot.user?.id) return;
      if (oldMsg.content === newMsg.content) return;

      const pOldMsg = oldMsg.content.length > 1024 ? `${oldMsg.content.slice(0, 1010)}...` : oldMsg;
      const PNewMsg = newMsg.content.length > 1024 ? `${newMsg.content.slice(0, 1010)}...` : newMsg;

      const messageLink = `https://discord.com/channels/${newMsg.guild.id}/${newMsg.channel.id}/${newMsg.id}`;

      const embed = bot.utils
        .baseEmbed(newMsg)
        .setTitle(`Message updated in **${(newMsg.channel as DJS.TextChannel).name}**`)
        .setDescription(
          `Message send by **${
            newMsg.author?.tag || newMsg.author?.id || "Unknown"
          }** was edited [jump to message](${messageLink})`,
        )
        .addField("**Old Message**", `${pOldMsg}`)
        .addField("**New Message**", `${PNewMsg}`)
        .setColor("ORANGE")
        .setTimestamp();

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
