import { Message } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class MessageDeleteEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "messageDelete");
  }

  async execute(bot: Bot, message: Message) {
    try {
      if (!message.guild?.available) return;
      if (!message.guild) return;
      if (!message.guild.me?.hasPermission("MANAGE_WEBHOOKS")) return;

      const webhook = await bot.utils.getWebhook(message.guild);
      if (!webhook) return;

      if (message.author?.id === bot.user?.id) return;

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle("Message deleted")
        .setDescription(`Message: \`${message.content}\` was deleted in ${message.channel}`)
        .setColor("RED")
        .setTimestamp();

      if (message.attachments.size > 0) {
        embed.setDescription(
          `Message: \`an image attachment was deleted ${
            message.content ? `+ ${message.content}\`` : "`"
          } was deleted in ${message.channel}`
        );
      }

      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
