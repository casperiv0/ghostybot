import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class VolumeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "volume",
      description: "Set the volume between 1 to 100",
      category: "music",
      aliases: ["vol"],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [newVol] = args;
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

      if (isNaN(Number(newVol))) {
        return message.channel.send({ content: lang.LEVELS.PROVIDE_VALID_NR });
      }

      if (!newVol) {
        return message.channel.send({ content: lang.LEVELS.PROVIDE_VALID_NR });
      }

      if (Number(newVol) < 0) {
        return message.channel.send({ content: lang.MUSIC.BETWEEN_0_100 });
      }

      if (Number(newVol) > 100) {
        return message.channel.send({ content: lang.MUSIC.BETWEEN_0_100 });
      }

      this.bot.player.setVolume(message, Number(newVol));
      await message.channel.send({ content: lang.MUSIC.VOL_SUCCESS.replace("{vol}", newVol) });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
