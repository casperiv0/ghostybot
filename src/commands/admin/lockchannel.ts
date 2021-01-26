import { Message, TextChannel } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class LockChannelCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "lockchannel",
      description: "Lock A channel",
      category: "admin",
      botPermissions: ["MANAGE_CHANNELS"],
      memberPermissions: ["MANAGE_CHANNELS"],
      requiredArgs: [{ name: "reason" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      let lockReason = args.join(" ");
      let channel = message.mentions.channels.first() as TextChannel;

      if (channel) {
        lockReason = args.join(" ").slice(22);
      } else {
        channel = message.channel as TextChannel;
      }

      if (channel.permissionsFor(message.guild!.id)?.has("SEND_MESSAGES") === false) {
        return message.channel.send(lang.ADMIN.CHANNEL_ALREADY_LOCKED);
      }

      channel.updateOverwrite(message.guild!.id, {
        SEND_MESSAGES: false,
      });

      message.channel.send(
        lang.ADMIN.LOCKED_CHANNEL_REASON.replace("{channel}", `${channel}`).replace(
          "{lockReason}",
          lockReason
        )
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
