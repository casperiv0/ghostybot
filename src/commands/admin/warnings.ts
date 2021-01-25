import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class WarningsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "warnings",
      description: "Returns how many warnings a user has",
      usage: "<user>",
      category: "admin",
      requiredArgs: [{ name: "user" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const guild = await bot.utils.getGuildById(message.guild?.id);
      const member = await bot.utils.findMember(message, args);

      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      const warnings = await bot.utils.getUserWarnings(member!.user.id, message.guild?.id);
      const prefix = guild?.prefix;
      const warningNr = Number(args[1]);

      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      if (member.user.bot) {
        return message.channel.send(lang.MEMBER.BOT_DATA);
      }

      const embed = bot.utils.baseEmbed(message);

      if (warningNr) {
        const warning = warnings?.filter((w, idx) => idx === warningNr - 1)[0];

        if (!warning) {
          return message.channel.send(
            lang.ADMIN.WARN_NOT_FOUND.replace("{memberTag}", member.user.tag)
          );
        }

        const warnedOn = warning?.date ? new Date(warning?.date)?.toLocaleString() : "N/A";
        embed
          .setTitle(`${lang.ADMIN.WARNING} ${warningNr}`)
          .addField(`**${lang.EVENTS.REASON}**`, warning?.reason || lang.GLOBAL.NOT_SPECIFIED)
          .addField(`**${lang.ADMIN.WARNED_ON}**`, warnedOn);

        return message.channel.send({ embed });
      }

      embed
        .setTitle(lang.ADMIN.MEMBER_WARNS.replace("{memberTag}", member.user.tag))
        .addField(`**${lang.ADMIN.TOTAL_WARNS}**`, warnings?.length || 0)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(lang.ADMIN.USE_WARNS.replace("{prefix}", `${prefix}`));

      message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
