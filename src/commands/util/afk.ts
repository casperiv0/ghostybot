import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class AfkCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "afk",
      aliases: ["setafk", "makemeafk"],
      category: "util",
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const guildId = message.guild?.id;
      const userId = message.author.id;
      const user = await bot.utils.getUserById(userId, guildId);
  
      if (user?.afk?.is_afk) {
        await bot.utils.updateUserById(userId, guildId, {
          afk: { is_afk: false, reason: null },
        });
  
        const embed = bot.utils
          .baseEmbed(message)
          .setTitle(lang.GLOBAL.SUCCESS)
          .setDescription(lang.UTIL.NOT_AFK);
  
        return message.channel.send(embed);
      }
  
      const reason = args.join(" ") || lang.GLOBAL.NOT_SPECIFIED;
  
      await bot.utils.updateUserById(userId, guildId, {
        afk: { is_afk: true, reason: reason },
      });
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.GLOBAL.SUCCESS)
        .setDescription(`${lang.UTIL.AFK}\n**${lang.GLOBAL.REASON}:** ${reason}`);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
