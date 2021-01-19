import { Message, TextChannel } from "discord.js";
import categories from "../../data/categories.json";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

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
      const nsfw = (message.channel as TextChannel).nsfw;

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

        if (["hentainsfw", "nsfw"].includes(cmdArgs.toLowerCase())) {
          if (nsfw) {
            embed.setDescription(`\`\`\`${cmds}\`\`\``);
            embed.setDescription(`\`\`\`${cmds}\`\`\``);
          } else {
            embed.setDescription(lang.HELP.NSFW_ONLY);
          }
        } else {
          embed.setDescription(`\`\`\`${cmds}\`\`\``);
        }
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
          memberPerms = !cmd.options.memberPermissions
            ? lang.GLOBAL.NONE
            : [...cmd.options.memberPermissions].map((p) => p);

          botPerms = !cmd.options.botPermissions
            ? ["SEND_MESSAGES"].map((p) => p)
            : [...cmd.options.botPermissions, "SEND_MESSAGES"].map((p) => p);

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

      for (let i = 0; i < categories.length; i++) {
        const category = commands
          .filter((cmd) => this.findCategory(cmd) === categories[i])
          .map(({ name }) => name);

        cates.push(category);
      }

      const embed = bot.utils.baseEmbed(message);

      for (let i = 0; i < cates.length; i++) {
        const name = lang.HELP.CATEGORIES[categories[i]];

        if (["nsfw", "hentainsfw"].includes(categories[i]) && !nsfw) {
          embed.addField(name, lang.HELP.NSFW_ONLY);
        } else {
          embed.addField(name, `\`\`\`${cates[i].join(", ")}\`\`\``);
        }
      }

      embed
        .addField(`${lang.HELP.GUILD_PREFIX}: `, prefix)
        .setDescription(lang.HELP.CMD_DESC.replace("{prefix}", `${prefix}`))
        .addField(
          lang.HELP.FULL_CMD_LIST,
          `[${lang.HELP.CLICK_ME}](https://github.com/Dev-CasperTheGhost/ghostybot/blob/main/docs/COMMANDS.md)`
        )
        .setTitle("Help");

      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }

  findCategory(cmd: Command | { name: string; category: string }): string {
    return "options" in cmd ? cmd.options.category : cmd.category;
  }
}
