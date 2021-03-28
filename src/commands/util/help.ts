import { Message, MessageEmbed, Permissions } from "discord.js";
import categories from "../../data/categories.json";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import paginate from "../../utils/paginate";

export default class HelpCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "help",
      description: "Shows all commands Or shows more info about a command",
      category: "util",
      cooldown: 2,
      usage: "<category name | command name>",
      aliases: ["h", "info", "commands"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const guild = await bot.utils.getGuildById(message.guild?.id);
      const prefix = guild?.prefix;
      const cmdArgs = args[0];

      const disabledCmds = !guild?.disabled_commands[0]
        ? [{ category: "disabled", name: lang.GLOBAL.NONE }]
        : guild.disabled_commands.map((cmd) => {
            return { name: cmd, category: "disabled" };
          });
      const customCmds = !guild?.custom_commands[0]
        ? [{ category: "custom", name: lang.GLOBAL.NONE }]
        : guild.custom_commands.map((cmd) => {
            return { name: cmd.name, category: "custom" };
          });

      const commands = [...bot.commands.array(), ...disabledCmds, ...customCmds];

      if (cmdArgs && categories.includes(cmdArgs.toLowerCase())) {
        const cmds = commands
          .filter((cmd) => this.findCategory(cmd) === cmdArgs.toLowerCase())
          .map(({ name }) => name)
          .join(", ");

        if (cmds.length < 0) {
          return message.channel.send(lang.HELP.CAT_NOT_EXIST);
        }

        const embed = bot.utils.baseEmbed(message).setTitle(`${lang.HELP.COMMANDS}: ${cmdArgs}`);

        embed.setDescription(`\`\`\`${cmds}\`\`\``);
        return message.channel.send({ embed });
      } else if (cmdArgs) {
        let cmd = commands.find((cmd) => cmd.name.toLowerCase() === cmdArgs.toLowerCase());
        if (!cmd)
          cmd = commands.find(
            (cmd) => cmd.name.toLowerCase() === bot.aliases.get(cmdArgs.toLowerCase())
          );
        if (!cmd) return message.channel.send(lang.HELP.CMD_NOT_FOUND);

        let aliases: string[] | string;
        let options: string[] | string;
        let cooldown: string;
        let memberPerms: string[] | string;
        let botPerms: string[] | string;

        if ("category" in cmd && cmd.category === "custom") {
          return message.channel.send(
            bot.utils
              .baseEmbed(message)
              .setTitle(`${lang.HELP.COMMAND}: ${cmd.name}`)
              .setDescription(`${lang.HELP.CUSTOM_CMD}`)
          );
        }

        if ("options" in cmd && cmd.options.category !== "custom") {
          aliases = cmd.options.aliases
            ? cmd.options.aliases.map((alias) => alias)
            : lang.GLOBAL.NONE;
          options = cmd.options.options
            ? cmd.options.options.map((option) => option)
            : lang.GLOBAL.NONE;
          cooldown = cmd.options.cooldown ? `${cmd.options.cooldown}s` : "3s";

          // @ts-expect-error this works
          memberPerms = !cmd.options.memberPermissions
            ? [lang.GLOBAL.NONE]
            : [...cmd.options.memberPermissions].map((p) => {
                const perms: string[] = [];

                Object.keys(Permissions.FLAGS).map((key) => {
                  if (Permissions.FLAGS[key] === p) {
                    perms.push(lang.PERMISSIONS[key]);
                  }
                });

                return perms;
              });

          botPerms = !cmd.options.botPermissions
            ? ["SEND_MESSAGES"].map((p) => lang.PERMISSIONS[p.toUpperCase()])
            : [...cmd.options.botPermissions, Permissions.FLAGS.SEND_MESSAGES].map((p) => {
                const perms: string[] = [];

                Object.keys(Permissions.FLAGS).map((key) => {
                  if (Permissions.FLAGS[key] === p) {
                    perms.push(lang.PERMISSIONS[key]);
                  }
                });

                return perms;
              });

          const embed = bot.utils
            .baseEmbed(message)
            .addField(lang.HELP.ALIASES, aliases, true)
            .addField(lang.HELP.COOLDOWN, `${cooldown}`, true)
            .addField(
              lang.HELP.USAGE,
              cmd.options.usage
                ? `${prefix}${cmd.name} ${cmd.options.usage}`
                : lang.GLOBAL.NOT_SPECIFIED,
              true
            )
            .addField(lang.UTIL.CATEGORY, cmd.options.category, true)
            .addField(
              lang.UTIL.DESCRIPTION,
              cmd.options.description ? cmd.options.description : lang.GLOBAL.NOT_SPECIFIED,
              true
            )
            .addField(lang.HELP.OPTIONS, options, true)
            .addField(lang.HELP.BOT_PERMS, botPerms, true)
            .addField(lang.HELP.MEMBER_PERMS, memberPerms, true);
          return message.channel.send(embed);
        }
      }

      const cates: string[][] = [];
      const embeds: MessageEmbed[] = [];
      const filteredCategories = categories.filter((category: string) => {
        return !guild?.disabled_categories.includes(category);
      });

      for (let i = 0; i < filteredCategories.length; i++) {
        const category = commands
          .filter((cmd) => this.findCategory(cmd) === filteredCategories[i])
          .map(({ name }) => name);

        cates.push(category);
      }

      for (let i = 0; i < cates.length; i++) {
        const name = lang.HELP.CATEGORIES[filteredCategories[i]];
        const categoryEmbed = bot.utils
          .baseEmbed(message)
          .setTitle("Help")
          .addField(name, `\`\`\`${cates[i].join(", ")}\`\`\``)
          .addField(`${lang.HELP.GUILD_PREFIX}: `, prefix)
          .setDescription(lang.HELP.CMD_DESC.replace("{prefix}", `${prefix}`))
          .addField(
            lang.HELP.FULL_CMD_LIST,
            `[${lang.HELP.CLICK_ME}](https://github.com/Dev-CasperTheGhost/ghostybot/blob/main/docs/COMMANDS.md)`
          );

        embeds.push(categoryEmbed);
      }

      await paginate(message, embeds);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }

  findCategory(cmd: Command | { name: string; category: string }): string {
    return "options" in cmd ? cmd.options.category : cmd.category;
  }
}
