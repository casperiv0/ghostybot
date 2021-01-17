import { Message, TextChannel } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class CTopicCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ctopic",
      description: "Update the channel topic",
      category: "admin",
      usage: "<channel> <topic>",
      botPermissions: ["MANAGE_CHANNELS"],
      memberPermissions: ["MANAGE_CHANNELS"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      let channel: TextChannel = message.mentions.channels.first() as TextChannel;
      let topic: string;
  
      if (!channel) {
        channel = message.channel as TextChannel;
        topic = args.join(" ");
      } else {
        topic = args.slice(1).join(" ").trim();
      }
  
      if (!topic) {
        return message.reply(lang.ADMIN.C_TOPIC_PROVIDE_TOPIC);
      }
  
      await channel.setTopic(topic);
      await message.channel.send(lang.ADMIN.C_TOPIC_ADDED.replace("{topic}", topic));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
