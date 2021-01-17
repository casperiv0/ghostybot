import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class MemberCountCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "membercount",
      description: "",
      category: "util",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      if (!message.guild) return;
      const { name, memberCount } = message.guild;
      const bots = message.guild.members.cache.filter((mem) => mem.user.bot).size;
      const humans = message.guild.members.cache.filter((mem) => !mem.user.bot).size;
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${name} ${lang.MEMBER.MEMBERS}`)
        .addField(`**${lang.UTIL.TOTAL_MB}**`, bot.utils.formatNumber(memberCount), true)
        .addField(`**${lang.UTIL.HUMANS}**`, bot.utils.formatNumber(humans), true)
        .addField(`**${lang.UTIL.BOTS}**`, bot.utils.formatNumber(bots), true);
  
      message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
