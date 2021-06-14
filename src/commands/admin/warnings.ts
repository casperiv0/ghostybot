import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

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

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const guild = await this.bot.utils.getGuildById(message.guild?.id);
      const member = await this.bot.utils.findMember(message, args);

      if (!member) {
        return message.channel.send({
          content: lang.ADMIN.PROVIDE_VALID_MEMBER,
        });
      }

      const warnings = await this.bot.utils.getUserWarnings(member!.user.id, message.guild?.id);
      const prefix = guild?.prefix;
      const warningNr = Number(args[1]);

      if (!member) {
        return message.channel.send({
          content: lang.ADMIN.PROVIDE_VALID_MEMBER,
        });
      }

      if (member.user.bot) {
        return message.channel.send({
          content: lang.MEMBER.BOT_DATA,
        });
      }

      const embed = this.bot.utils.baseEmbed(message);

      if (warningNr) {
        const warning = warnings?.filter((_, idx) => idx === warningNr - 1)[0];

        if (!warning) {
          return message.channel.send({
            content: lang.ADMIN.WARN_NOT_FOUND.replace("{memberTag}", member.user.tag),
          });
        }

        const warnedOn = warning?.date ? new Date(warning?.date)?.toLocaleString() : "N/A";
        embed
          .setTitle(`${lang.ADMIN.WARNING} ${warningNr}`)
          .addField(`**${lang.EVENTS.REASON}**`, warning?.reason || lang.GLOBAL.NOT_SPECIFIED)
          .addField(`**${lang.ADMIN.WARNED_ON}**`, warnedOn);

        return message.channel.send({ embeds: [embed] });
      }

      embed
        .setTitle(lang.ADMIN.MEMBER_WARNS.replace("{memberTag}", member.user.tag))
        .addField(`**${lang.ADMIN.TOTAL_WARNS}**`, (warnings?.length || 0).toString())
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(lang.ADMIN.USE_WARNS.replace("{prefix}", `${prefix}`));

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
