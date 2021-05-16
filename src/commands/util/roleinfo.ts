import { Message } from "discord.js";
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
      const role = await this.bot.utils.findRole(message, args[0]);
      if (!message.guild) return;

      if (!role) {
        return message.channel.send(lang.UTIL.ROLE_NOT_FOUND);
      }

      const permissions =
        role.permissions.toArray().length <= 0
          ? lang.GLOBAL.NONE
          : `\`\`\`${role.permissions
              .toArray()
              .map((p) => lang.PERMISSIONS[p])
              .join(", ")}\`\`\``;
      const { date, tz } = await this.bot.utils.formatDate(role.createdAt, message.guild?.id);
      const mentionable = role.mentionable ? lang.GLOBAL.YES : lang.GLOBAL.NO;
      const name = role.name;
      const id = role.id;
      const color = role.color || "#2F3136";
      const position = message.guild?.roles.cache.size - role.position;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`**${name}**`)
        .setColor(color)
        .addField(`**${lang.MEMBER.CREATED_ON}**`, `${date} (${tz})`, true)
        .addField(`**${lang.UTIL.MENTIONABLE}**`, mentionable, true)
        .addField(`**${lang.UTIL.POSITION}**`, position, true)
        .addField(`**${lang.MEMBER.ID}**`, id, true)
        .addField(lang.MEMBER.PERMISSIONS, permissions);

      message.channel.send(embed);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
