import { Message, TextChannel } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class UnLockChannelCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "unlockchannel",
      description: "Unlock A channel",
      category: "admin",
      usage: "<channel mention | current channel>",
      botPermissions: ["MANAGE_CHANNELS"],
      memberPermissions: ["MANAGE_CHANNELS"],
    });
  }

  async execute(bot: Bot, message: Message) {
    if (!message.guild?.me) return;

    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const channel = (message.mentions.channels.first() || message.channel) as TextChannel;
  
      if (channel.permissionsFor(message.guild?.id)?.has("SEND_MESSAGES") === true) {
        return message.channel.send(lang.ADMIN.CHAN_NOT_LOCK);
      }
  
      channel.updateOverwrite(message.guild?.id, {
        SEND_MESSAGES: true,
      });
      message.channel.send(lang.ADMIN.SUC_UNLOCK.replace("{channel}", `${channel}`));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
