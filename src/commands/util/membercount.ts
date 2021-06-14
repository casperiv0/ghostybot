import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class MemberCountCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "membercount",
      description: "",
      category: "util",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      if (!message.guild) return;
      const { name, memberCount } = message.guild;
      const bots = message.guild.members.cache.filter((mem) => mem.user.bot).size;
      const humans = message.guild.members.cache.filter((mem) => !mem.user.bot).size;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${name} ${lang.MEMBER.MEMBERS}`)
        .addField(`**${lang.UTIL.TOTAL_MB}**`, this.bot.utils.formatNumber(memberCount), true)
        .addField(`**${lang.UTIL.HUMANS}**`, this.bot.utils.formatNumber(humans), true)
        .addField(`**${lang.UTIL.BOTS}**`, this.bot.utils.formatNumber(bots), true);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
