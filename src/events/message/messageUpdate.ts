import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

/**
 * @deprecated this event will be deprecated once message intents arrive
 */
export default class MessageUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, DJS.Constants.Events.MESSAGE_UPDATE);
  }

  async execute(bot: Bot, oldMsg: DJS.Message, newMsg: DJS.Message) {
    try {
      if (!newMsg.guild?.available) return;
      if (!newMsg.guild.me?.permissions.has(DJS.PermissionFlagsBits.ManageWebhooks)) return;

      const webhook = await bot.utils.getWebhook(newMsg.guild);
      if (!webhook) return;
      const guild = await bot.utils.getGuildById(newMsg.guild.id);
      if (!guild) return;

      if (!oldMsg.content || !newMsg.content) {
        return;
      }
      if (newMsg.author?.id === bot.user?.id) return;
      if (oldMsg.content === newMsg.content) return;

      const pOldMsg =
        oldMsg.content.length > 1024 ? `${oldMsg.content.substring(0, 1010)}...` : oldMsg;
      const PNewMsg =
        newMsg.content.length > 1024 ? `${newMsg.content.substring(0, 1010)}...` : newMsg;

      const messageLink = `https://discord.com/channels/${newMsg.guild.id}/${newMsg.channel.id}/${newMsg.id}`;
      const name = newMsg.channel.isText() ? newMsg.channel.name : "N/A";

      const embed = bot.utils
        .baseEmbed(newMsg)
        .setTitle(`Message updated in **${name}**`)
        .setDescription(
          `Message send by **${
            newMsg.author?.tag || newMsg.author?.id || "Unknown"
          }** was edited [jump to message](${messageLink})`,
        )
        .addField({ name: "**Old Message**", value: pOldMsg.toString() })
        .addField({ name: "**New Message**", value: PNewMsg.toString() })
        .setColor(DJS.Util.resolveColor("ORANGE"))
        .setTimestamp();

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
