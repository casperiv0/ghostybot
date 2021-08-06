import { Message, MessageEmbed, Permissions } from "discord.js";
import { hyperlink, inlineCode } from "@discordjs/builders";
import Command from "structures/Command";
import Bot from "structures/Bot";
import paginate from "utils/paginate";

const REGULAR_CATEGORIES = ["admin", "util"];

export default class HelpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "help",
      description: "Shows all commands Or shows more info about a command",
      category: "util",
      cooldown: 2,
      usage: "<category name | command name>",
      aliases: ["h", "info", "commands"],
      botPermissions: [Permissions.FLAGS.ADD_REACTIONS],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const guild = await this.bot.utils.getGuildById(message.guild?.id);
      const prefix = guild?.prefix ?? "!";
      const [cmdArgs] = args;

      const disabledCmds = !guild?.disabled_commands[0]
        ? [{ category: "disabled", name: lang.GLOBAL.NONE }]
        : guild.disabled_commands.map((cmd) => {
            return { name: cmd, category: "disabled" };
          });

      const commands = [...this.bot.commands.map((v) => ({ ...v.options })), ...disabledCmds];

      if (cmdArgs && REGULAR_CATEGORIES.includes(cmdArgs.toLowerCase())) {
        const cmds = commands
          .filter((cmd) => this.findCategory(cmd) === cmdArgs.toLowerCase())
          .map(({ name }) => inlineCode(name))
          .join(", ");

        if (cmds.length < 0) {
          return message.channel.send({ content: lang.HELP.CAT_NOT_EXIST });
        }

        const embed = this.bot.utils
          .baseEmbed(message)
          .setTitle(`${lang.HELP.COMMANDS}: ${cmdArgs}`);

        embed.setDescription(cmds);
        return message.channel.send({ embeds: [embed] });
      } else if (cmdArgs) {
        const cmd = this.findCommand(cmdArgs, commands);

        if (!cmd) {
          return message.channel.send({ content: lang.HELP.CMD_NOT_FOUND });
        }

        let aliases: string;
        let options: string;
        let cooldown: string;
        let memberPerms: string;
        let botPerms: string;
        let usage: string;

        if ("options" in cmd) {
          if (cmd.options.aliases) {
            aliases = cmd.options.aliases.map((alias) => alias).join(", ");
          } else {
            aliases = lang.GLOBAL.NONE;
          }

          if (cmd.options.options) {
            options = cmd.options.options.map((option) => option).join(", ");
          } else {
            options = lang.GLOBAL.NONE;
          }

          if (cmd.options.cooldown) {
            cooldown = `${cmd.options.cooldown}s`;
          } else {
            cooldown = "3s";
          }

          if (cmd.options.usage) {
            usage = `${prefix}${cmd.name} ${cmd.options.usage}`;
          } else {
            usage = lang.GLOBAL.NOT_SPECIFIED;
          }

          memberPerms = getMemberPermissions(cmd, lang).join(", ");
          botPerms = getBotPermissions(cmd, lang).join(", ");

          const embed = this.bot.utils
            .baseEmbed(message)
            .addField(lang.HELP.ALIASES, aliases, true)
            .addField(lang.HELP.COOLDOWN, cooldown, true)
            .addField(lang.HELP.USAGE, usage, true)
            .addField(lang.UTIL.CATEGORY, cmd.options.category, true)
            .addField(lang.HELP.OPTIONS, options, true)
            .addField(lang.HELP.BOT_PERMS, botPerms, true)
            .addField(lang.HELP.MEMBER_PERMS, memberPerms, true);

          if (cmd.options.description) {
            embed.setDescription(cmd.options.description);
          }

          return message.channel.send({ embeds: [embed] });
        }
      }

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

  findCommand(args: string, commands: (Command | { name: string; category: string })[]) {
    let command = commands.find((cmd) => cmd.name.toLowerCase() === args.toLowerCase());
    if (command) return command;

    const filter = (cmd) => cmd.name.toLowerCase() === this.bot.aliases.get(args.toLowerCase());
    command = commands.find(filter);

    return command;
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
