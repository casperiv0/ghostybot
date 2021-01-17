import { Message, TextChannel } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ChannelInfoCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "channelinfo",
      description: "Get information about a channel",
      category: "util",
      aliases: ["channel"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const channel = (message.mentions.channels.first() ||
        message.guild?.channels.cache.get(args[0]) ||
        message.channel) as TextChannel;
  
      const topic = channel?.topic ? channel.topic : "N/A";
      const channelId = channel?.id;
      const { date, tz } = await bot.utils.formatDate(channel.createdAt, message.guild?.id);
      const type = channel?.type === "text" ? lang.UTIL.TEXT_CHANNEL : lang.UTIL.VOICE_CHANNEL;
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${channel?.name}`)
        .addField(lang.BOT_OWNER.EVAL_TYPE, type, true)
        .addField(lang.UTIL.CHANNEL_TOPIC, topic, true)
        .addField(lang.MEMBER.ID, channelId, true)
        .addField(lang.MEMBER.CREATED_ON, `${date} (${tz})`, true);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
