import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";
import { bold } from "@discordjs/builders";

export default class ProfileCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "profile",
      description: "See the full profile of a user",
      category: "economy",
      cooldown: 2,
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await this.bot.utils.findMember(message, args, { allowAuthor: true });

      if (member?.user?.bot) {
        return message.channel.send({ content: lang.MEMBER.BOT_DATA });
      }

      const userId = member?.user?.id;
      const guildId = message.guild?.id;
      const user = await this.bot.utils.getUserById(userId!, guildId);

      if (!user) {
        return message.channel.send({ content: lang.GLOBAL.ERROR });
      }

      const { money, bank, inventory, xp } = user;
      const level = this.bot.utils.calculateXp(xp);

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${member?.user.username} ${lang.ECONOMY.PROFILE}`)
        .setDescription(
          `
${bold(lang.LEVELS.XP)}: ${this.bot.utils.formatNumber(xp)}
${bold(lang.LEVELS.LEVEL)}: ${level}
${bold(lang.ECONOMY.MONEY)}: ${this.bot.utils.formatNumber(money)}
${bold(lang.ECONOMY.BANK)}: ${this.bot.utils.formatNumber(bank)}
        `,
        )
        .addField(bold(lang.ECONOMY.INV_ITEMS), inventory.length.toString(), true);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
