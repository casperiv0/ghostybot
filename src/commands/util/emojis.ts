import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class EmojisCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "emojis",
      description: "Get a random color",
      category: "util",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const nonAnimated: string[] = [];
    const animated: string[] = [];

    try {
      message.guild?.emojis.cache.forEach((e) => {
        if (e.animated) animated.push(e.toString());
        else nonAnimated.push(e.toString());
      });
  
      const animatedV =
        animated.join(" ").length > 1024
          ? `${animated.join(" ").slice(1010)}...`
          : animated.join(" ");
  
      const nonAnimatedV =
        nonAnimated.join(" ").length > 1024
          ? `${nonAnimated.join(" ").slice(1010)}...`
          : nonAnimated.join(" ");
  
      const embed = bot.utils
        .baseEmbed(message)
        .addField(`${lang.UTIL.ANIMATED}:`, animated.length === 0 ? lang.GLOBAL.NONE : animatedV)
        .addField(
          `${lang.UTIL.NON_ANIMATED}:`,
          nonAnimated.length === 0 ? lang.GLOBAL.NONE : nonAnimatedV
        );
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
