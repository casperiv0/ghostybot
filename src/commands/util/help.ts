import { Message, MessageEmbed, Permissions } from "discord.js";
import { hyperlink, inlineCode } from "@discordjs/builders";
import { Command } from "structures/Command";
import { Bot } from "structures/Bot";
import paginate from "utils/paginate";

const REGULAR_CATEGORIES = ["admin", "util"];

export default class HelpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "help",
      description: "Shows all commands Or shows more info about a command",
      category: "util",
      cooldown: 2,
      aliases: ["h", "info", "commands"],
      botPermissions: [Permissions.FLAGS.ADD_REACTIONS],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const guild = await this.bot.utils.getGuildById(message.guild?.id);
      const prefix = guild?.prefix ?? "!";

      const disabledCmds = !guild?.disabled_commands[0]
        ? [{ category: "disabled", name: lang.GLOBAL.NONE }]
        : guild.disabled_commands.map((cmd) => {
            return { name: cmd, category: "disabled" };
          });

      const commands = [...this.bot.commands.map((v) => ({ ...v.options })), ...disabledCmds];

      const cates: string[][] = [];
      const embeds: MessageEmbed[] = [];
      const filteredCategories = REGULAR_CATEGORIES.filter((category: string) => {
        return !guild?.disabled_categories.includes(category);
      });

      for (let i = 0; i < filteredCategories.length; i++) {
        const category = commands
          .filter((cmd) => this.findCategory(cmd) === filteredCategories[i])
          .map(({ name }) => inlineCode(name));

        cates.push(category);
      }

      for (let i = 0; i < cates.length; i++) {
        const LINK = hyperlink(
          lang.HELP.CLICK_ME,
          "https://github.com/Dev-CasperTheGhost/ghostybot/blob/main/docs/COMMANDS.md",
        );
        const name = lang.HELP.CATEGORIES[filteredCategories[i]];

        const categoryEmbed = this.bot.utils
          .baseEmbed(message)
          .setTitle(lang.HELP.HELP)
          .addField(name, cates[i].join(", "))
          .addField(`${lang.HELP.GUILD_PREFIX}: `, prefix)
          .setDescription(lang.HELP.DEPRECATED)
          .addField(lang.HELP.FULL_CMD_LIST, LINK);

        embeds.push(categoryEmbed);
      }

      await paginate(message, embeds);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }

  findCategory(cmd: Command | { name: string; category: string }): string {
    return "options" in cmd ? cmd.options.category : cmd.category;
  }
}

export function getMemberPermissions(command: Command, lang: any) {
  return !command.options.memberPermissions
    ? [lang.GLOBAL.NONE]
    : [...command.options.memberPermissions].map((p) => {
        const perms: string[] = [];

        Object.keys(Permissions.FLAGS).map((key) => {
          if (Permissions.FLAGS[key] === p) {
            perms.push(lang.PERMISSIONS[key]);
          }
        });

        return perms;
      });
}

export function getBotPermissions(command: Command, lang: any) {
  return !command.options.botPermissions
    ? ["SEND_MESSAGES"].map((p) => lang.PERMISSIONS[p.toUpperCase()])
    : [...command.options.botPermissions, Permissions.FLAGS.SEND_MESSAGES].map((p) => {
        const perms: string[] = [];

        Object.keys(Permissions.FLAGS).map((key) => {
          if (Permissions.FLAGS[key] === p) {
            perms.push(lang.PERMISSIONS[key]);
          }
        });

        return perms;
      });
}
