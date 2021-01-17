import { Message } from "discord.js";
import badges from "../../data/badges.json";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class UserInfoCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "userinfo",
      description: "Get user info",
      usage: "<user>",
      category: "util",
      aliases: ["whois", "user", "u"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const member = await bot.utils.findMember(message, args, true);
  
      if (!member) {
        return message.channel.send(lang.MEMBER.NOT_FOUND);
      }
  
      const { date: joinedAt, tz } = await bot.utils.formatDate(member?.joinedAt, message.guild?.id);
      const { date: createdAt } = await bot.utils.formatDate(
        member.user.createdAt,
        message.guild?.id
      );
      const nickname = member.nickname || "None";
      const userFlags = (await member.user.fetchFlags())
        .toArray()
        .map((flag) => badges[flag])
        .join(" ");
  
      const roles =
        member.roles.cache
          .filter((r) => r.id !== message.guild?.id)
          .sort((a, b) => b.rawPosition - a.rawPosition)
          .map((r) => r)
          .join(", ") || "None";
      const roleCount = member.roles.cache.filter((r) => r.id !== message.guild?.id).size;
  
      const { username, id, tag } = member.user;
  
      const embed = bot.utils
        .baseEmbed(message)
        .addField(`**${lang.MEMBER.ID}**`, id, true)
        .addField(`**${lang.MEMBER.USERNAME}**`, username, true)
        .addField(`**${lang.MEMBER.TAG}**`, tag, true)
        .addField(`**${lang.MEMBER.BADGES}**`, userFlags.length > 0 ? userFlags : "None", true)
        .addField(`**${lang.MEMBER.CREATED_ON}**`, `${createdAt} (${tz})`, true)
        .addField(`**${lang.MEMBER.JOINED_AT}**`, `${joinedAt} (${tz})`, true)
        .addField(`**${lang.MEMBER.NICKNAME}**`, nickname, true)
        .addField(`**${lang.MEMBER.ROLES} (${roleCount})**`, roles)
        .setTitle(`${username}'s info`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
