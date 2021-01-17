import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import { Message } from "discord.js";

export default class XpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "xp",
      description: "Get xp from a user or yourself",
      category: "levels",
      usage: "<user>",
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await bot.utils.findMember(message, args, true);

      if (member?.user?.bot) {
        return message.channel.send(lang.MEMBER.BOT_DATA);
      }

      if (!member) {
        return message.channel.send(lang.MEMBER.NOT_FOUND);
      }

      const user = await this.bot.utils.getUserById(member?.user?.id, message.guild?.id);

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${member.user.username} ${lang.LEVELS.XP}`)
        .setDescription(`${lang.LEVELS.XP}: ${user?.xp}`);

      return message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send("lang.GLOBAL.ERROR");
    }
  }
}
