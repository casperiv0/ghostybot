import { bold, time } from "@discordjs/builders";
import { Message, Snowflake } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class RoleInfoCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "roleinfo",
      description: "Shows info about a role",
      category: "util",
      aliases: ["role"],
      requiredArgs: [{ name: "role" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const role = await this.bot.utils.findRole(message, args[0] as Snowflake);
      if (!message.guild) return;

      if (!role) {
        return message.channel.send({ content: lang.UTIL.ROLE_NOT_FOUND });
      }

      const permissions =
        role.permissions.toArray().length <= 0
          ? lang.GLOBAL.NONE
          : `\`\`\`${role.permissions
              .toArray()
              .map((p) => lang.PERMISSIONS[p])
              .join(", ")}\`\`\``;

      const mentionable = role.mentionable ? lang.GLOBAL.YES : lang.GLOBAL.NO;
      const color = role.color || "#5865f2";
      const position = message.guild?.roles.cache.size - role.position;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(bold(role.name))
        .setColor(color)
        .setDescription(
          `
${bold(lang.UTIL.POSITION)}: ${position}
${bold(lang.UTIL.MENTIONABLE)}: ${mentionable}
${bold(lang.MEMBER.ID)}: ${role.id}
${bold(lang.UTIL.HEX_COLOR)}: ${role.hexColor}
${bold(lang.MEMBER.CREATED_ON)}: ${time(new Date(role.createdAt), "F")}`,
        )
        .addField("Role mention", `<@&${role.id}>`)
        .addField(lang.MEMBER.PERMISSIONS, permissions);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
