import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import places from "../../data/places.json";
import UserModel, { IUser } from "../../models/User.model";

export default class MoneyLeaderboardCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "moneyleaderboard",
      description: "Returns a leaderboard with the top 10 users money",
      category: "economy",
      aliases: ["mlb"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const guildId = message.guild?.id;
      const data = (await UserModel.find({ guild_id: guildId }))
        .map((v: IUser) => {
          return { total: v.money + v.bank, ...v };
        })
        .sort((a, b) => b.total - a.total)
        .splice(0, 10);
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${message.guild?.name} ${lang.ECONOMY.MONEY_LEADERBOARD}`)
        .setFooter(lang.ECONOMY.BOTH_COUNTED);
  
      data.forEach(async (item, idx) => {
        const userId = item._doc.user_id;
        const member = await bot.utils.findMember(message, [userId]);
        const isInPlace = [0, 1, 2].includes(idx);
  
        if (member) {
          embed.addField(
            member.user.username,
            `${isInPlace ? places[idx] : ""} ${data[idx].total} ${lang.ECONOMY.TOTAL_BALANCE}`,
            true
          );
        }
      });
  
      setTimeout(() => {
        message.channel.send({ embed });
      }, 400);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
