import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ChannelsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "channels",
      description: "Shows all channels in the server",
      category: "util",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const channels = message.guild?.channels.cache;
      const voiceChannels = channels
        ?.filter((channel) => channel.type === "voice")
        .map((channel) => channel.name)
        .join(", ");
      const textChannels = channels
        ?.filter((channel) => channel.type === "text")
        .map((channel) => `<#${channel.id}>`)
        .join(", ");
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${message.guild?.name}'s channels`)
        .addField(`**${lang.UTIL.VOICE_CHANNELS}:**`, voiceChannels)
        .addField(`**${lang.UTIL.TEXT_CHANNELS}:**`, textChannels);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
