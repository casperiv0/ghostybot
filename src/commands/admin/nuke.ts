import { Message, TextChannel, Permissions } from "discord.js";
import { Command } from "structures/Command";
import { Bot } from "structures/Bot";

export default class NukeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "nuke",
      description: "Nuke the current channel, delete all messages of the channel",
      aliases: ["channelnuke"],
      category: "admin",
      botPermissions: [Permissions.FLAGS.MANAGE_CHANNELS],
      memberPermissions: [Permissions.FLAGS.MANAGE_CHANNELS],
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const channel = message.channel as TextChannel;

      if (!channel) {
        return message.channel.send({ content: lang.GLOBAL.ERROR });
      }

      if (!channel.deletable) {
        return message.channel.send({
          content: lang.ADMIN.CHANNEL_CANNOT_BE_DELETED,
        });
      }

      const position = channel.position;
      const topic = channel.topic;

      const filter = (m: Message) => m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector({ filter, time: 15000 });

      message.channel.send({
        content: lang.ADMIN.NUKE_CONFIRM,
      });

      collector.on("collect", async (m) => {
        if (m.content?.toLowerCase() === "y") {
          const channel2 = await channel.clone({ position, topic: topic ?? "" });

          channel.delete();

          channel2.send({
            content: lang.ADMIN.NUKE_NUKED,
          });
        } else {
          collector.stop();
          m.channel.send({
            content: lang.ADMIN.NUKE_CANCELED,
          });
        }
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
