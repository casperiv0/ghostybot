import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class BalanceCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "balance",
      description: "balance",
      category: "economy",
      aliases: ["bal"],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await this.bot.utils.findMember(message, args, { allowAuthor: true });

      if (!member) {
        return message.channel.send({ content: lang.ADMIN.PROVIDE_VALID_MEMBER });
      }

      if (member.user?.bot) {
        return message.channel.send({ content: lang.MEMBER.BOT_DATA });
      }

      const user = await this.bot.utils.getUserById(member?.user?.id, message.guild?.id);
      if (!user) {
        return message.channel.send({ content: lang.ADMIN.PROVIDE_VALID_MEMBER });
      }

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${member.user.username} ${lang.ECONOMY.BALANCE}`)
        .addField(lang.ECONOMY.MONEY, this.bot.utils.formatNumber(user.money), true)
        .addField(lang.ECONOMY.BANK, this.bot.utils.formatNumber(user.bank), true)
        .addField(lang.COVID.TOTAL, this.bot.utils.formatNumber(user.bank + user.money), true);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
