import { Message } from "discord.js";
import { bold, inlineCode } from "@discordjs/builders";
import badges from "assets/ts/badges";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class UserInfoCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "userinfo",
      description: "Get user info",
      usage: "<user>",
      category: "util",
      aliases: ["whois", "user", "u"],
      typing: true,
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const member = await this.bot.utils.findMember(message, args, { allowAuthor: true });

      if (!member) {
        return message.channel.send({ content: lang.MEMBER.NOT_FOUND });
      }

      const { username, id, tag } = member.user;

      const { date: joinedAt, tz } = await this.bot.utils.formatDate(
        member.joinedAt ? new Date(member.joinedAt) : null,
        message.guild?.id,
      );
      const { date: createdAt } = await this.bot.utils.formatDate(
        new Date(member.user.createdAt),
        message.guild?.id,
      );
      const nickname = member.nickname || lang.GLOBAL.NONE;

      const userFlags =
        (await member.user.fetchFlags(true))
          .toArray()
          .map((flag) => badges[flag])
          .join(" ") || lang.GLOBAL.NONE;

      const roles =
        member.roles.cache
          .filter((r) => r.id !== message.guild?.id)
          .sort((a, b) => b.rawPosition - a.rawPosition)
          .map((r) => r)
          .join(", ") || lang.GLOBAL.NONE;
      const roleCount = member.roles.cache.filter((r) => r.id !== message.guild?.id).size;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${username}'s info`)
        .setDescription(
          `
${bold(lang.MEMBER.ID)}: ${inlineCode(id)}
${bold(lang.MEMBER.TAG)}: ${tag}
${bold(lang.MEMBER.BADGES)}: ${userFlags}
${bold(lang.MEMBER.CREATED_ON)}: ${createdAt} (${tz})
`,
        )

        .addField(
          "Guild info",
          `
${bold(lang.MEMBER.NICKNAME)}: ${nickname}
${bold(lang.MEMBER.JOINED_AT)}: ${joinedAt} (${tz})
`,
        )
        .addField(bold(`${lang.MEMBER.ROLES} (${roleCount})`), roles)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
