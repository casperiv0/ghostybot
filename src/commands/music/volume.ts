import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class VolumeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "volume",
      description: "Set the volume between 1 to 100",
      category: "music",
      aliases: ["vol"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [newVol] = args;
      const queue = bot.player.getQueue(message);
      if (!message.member?.voice.channel) {
        return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
      }
  
      if (!bot.player.isPlaying(message)) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }
  
      if (!queue) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }
  
      if (isNaN(Number(newVol))) {
        return message.channel.send(lang.LEVELS.PROVIDE_VALID_NR);
      }
  
      if (Number(newVol) < 0) {
        return message.channel.send(lang.MUSIC.BETWEEN_0_100);
      }
  
      if (Number(newVol) > 100) {
        return message.channel.send(lang.MUSIC.BETWEEN_0_100);
      }
  
      if (!newVol) {
        return message.channel.send(lang.LEVELS.PROVIDE_VALID_NR);
      }
  
      bot.player.setVolume(message, Number(newVol));
      await message.channel.send(lang.MUSIC.VOL_SUCCESS.replace("{vol}", newVol));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
