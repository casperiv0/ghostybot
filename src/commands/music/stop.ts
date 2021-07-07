import { Message, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class StopCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "stop",
      description: "stop",
      category: "music",
      aliases: ["leave"],
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const queue = this.bot.player.getQueue(message);
      if (!message.member?.voice.channel) {
        return message.channel.send({ content: lang.MUSIC.MUST_BE_IN_VC });
      }

      if (!queue || !queue.playing) {
        return message.channel.send({ content: lang.MUSIC.NO_QUEUE });
      }

      if (queue && !this.bot.utils.isBotInSameChannel(message)) {
        return message.channel.send({ content: "Bot is not in this voice channel!" });
      }

      this.bot.player?.stop(message);

      if (message.guild?.me?.permissions.has(Permissions.FLAGS.ADD_REACTIONS)) {
        message.react("👍");
      } else {
        message.reply({ content: "👍" });
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
