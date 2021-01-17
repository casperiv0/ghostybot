import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import { Message } from "discord.js";
import UserModel, { IUser } from "../../models/User.model";
import places from "../../data/places.json";

export default class XpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "leaderboard",
      description: "Shows top 10 users with the highest amount of XP",
      category: "levels",
      aliases: ["lb"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const guildId = message.guild?.id;
      const data = (await UserModel.find({ guild_id: guildId }))
        .sort((a: IUser, b: IUser) => b.xp - a.xp)
        .splice(0, 10);

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${message.guild?.name} ${lang.LEVELS.LEADERBOARD}`);

      data.forEach(async (item: IUser, idx: number) => {
        const userId = item.user_id;
        const member = await bot.utils.findMember(message, [userId]);
        const isInPlace = [0, 1, 2].includes(idx);

        if (member) {
          embed.addField(
            member.user.username,
            `${isInPlace ? places[idx] : ""} ${data[idx].xp}xp`,
            true
          );
        }
      });

      setTimeout(() => {
        message.channel.send({ embed });
      }, 300);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
