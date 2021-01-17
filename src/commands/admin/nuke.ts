import { Message, TextChannel } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class NukeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "nuke",
      description: "Nuke the current channel, delete all messages of the channel",
      aliases: ["channelnuke"],
      category: "admin",
      botPermissions: ["MANAGE_CHANNELS"],
      memberPermissions: ["MANAGE_CHANNELS"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const channel = message.channel as TextChannel;
  
      if (!channel) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }
  
      const position = channel.position;
      const topic = channel.topic;
  
      const filter = (m: Message) => m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector(filter, {
        time: 15000,
      });
  
      message.channel.send(lang.ADMIN.NUKE_CONFIRM);
  
      collector.on("collect", async (m) => {
        if (m.content?.toLowerCase() === "y") {
          const channel2 = await channel.clone();
  
          channel2.setPosition(position);
          channel2.setTopic(topic);
          channel.delete();
          channel2.send(lang.ADMIN.NUKE_NUKED);
        } else {
          collector.stop();
          return message.channel.send(lang.ADMIN.NUKE_CANCELED);
        }
      });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
