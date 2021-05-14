import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

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
        return message.channel.send(lang.MEMBER.BOT_DATA);
      }

      const userId = member?.user?.id;
      const guildId = message.guild?.id;
      const user = await this.bot.utils.getUserById(userId!, guildId);

      if (!user) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }

      const guild = await this.bot.utils.getGuildById(guildId);

      const { money, bank, inventory, xp } = user;
      const level = this.bot.utils.calculateXp(xp);

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${member?.user.username} ${lang.ECONOMY.PROFILE}`)
        .addField(`**${lang.LEVELS.XP}**`, xp, true)
        .addField(`**${lang.LEVELS.LEVEL}**`, level, true)
        .addField(`**${lang.ECONOMY.MONEY}**`, money, true)
        .addField(`**${lang.ECONOMY.BANK}**`, bank, true)
        .addField(`**${lang.ECONOMY.INV_ITEMS}**`, inventory.length, true)
        .setDescription(lang.ECONOMY.VIEW_INVENTORY.replace("{prefix}", `${guild?.prefix}`));

      message.channel.send({ embed });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
