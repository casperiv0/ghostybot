import { Message, TextChannel } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class AnnounceCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "announce",
      description: "Announce something in a channel",
      usage: "[channel] <text>",
      category: "admin",
      memberPermissions: ["MANAGE_MESSAGES"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      if (!args[0])
        return message.channel.send(
          lang.ADMIN.TEXT_OR_VALID_CHANNEL + "\n" + lang.ADMIN.DEFAULT_ANNOUNCE_CHANNEL
        );

      const guild = await bot.utils.getGuildById(message.guild?.id);
      const announceChannel = guild?.announcement_channel;
      let channel = message.mentions.channels.first();
      let text: string;

      if (channel) {
        text = args.splice(1).join(" ");
      } else if (announceChannel !== null) {
        channel = message.channel as TextChannel;
        text = args.join(" ");
      } else {
        return message.channel.send(lang.ADMIN.TEXT_OR_VALID_CHANNEL);
      }

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.ADMIN.ANNOUNCEMENT)
        .setDescription(text);

      (bot.channels.cache.get(
        announceChannel ? announceChannel : channel!.id
      ) as TextChannel)?.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
