const { owners } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");
const categories = require("../../data/categories.json");

module.exports = {
  name: "help",
  description: "Shows all commands Or shows more info about a command",
  category: "util",
  cooldown: 2,
  usage: "h <category name | command name>",
  aliases: ["h", "info", "commands"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const guild = await bot.getGuildById(message.guild.id);
    const prefix = guild.prefix;
    const cmdArgs = args[0];
    const nsfw = message.channel.nsfw;
    const isBotOwner = owners.includes(message.author.id);

    const disabledCmds = !guild.disabled_commands[0]
      ? [{ category: "disabled", name: lang.GLOBAL.NONE }]
      : guild.disabled_commands.map((cmd) => {
          return { name: cmd, category: "disabled" };
        });
    const customCmds = !guild.custom_commands[0]
      ? [{ category: "custom", name: lang.GLOBAL.NONE }]
      : guild.custom_commands.map((cmd) => {
          return { name: cmd.name, category: "custom" };
        });

    const commands = [...bot.commands.array(), ...disabledCmds, ...customCmds];

    if (cmdArgs && categories.includes(cmdArgs.toLowerCase())) {
      const cmds = commands
        .filter(({ category }) => category === cmdArgs.toLowerCase())
        .map(({ name }) => name)
        .join(", ");

      if (cmds.length < 0) {
        return message.channel.send(lang.HELP.CAT_NOT_EXIST);
      }

      const embed = BaseEmbed(message).setTitle(`${lang.HELP.COMMANDS}: ${cmdArgs}`);

      if (cmdArgs === "botowner") {
        if (isBotOwner) {
          embed.setDescription(`\`\`\`${cmds}\`\`\``);
        } else {
          embed.setDescription(lang.HELP.OWNER_ONLY);
        }
      } else if (["hentainsfw", "nsfw"].includes(cmdArgs.toLowerCase())) {
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
      const cmd = commands.find((cmd) => cmd.name.toLowerCase() === cmdArgs.toLowerCase());
      if (!cmd) return message.channel.send(lang.HELP.CMD_NOT_FOUND);

      let aliases;
      let options;
      let cooldown;
      let memberPerms;
      let botPerms;

      const embed = BaseEmbed(message)
        .setTitle(`${lang.HELP.COMMAND}: ${cmd.name}`)
        .setDescription(`${lang.HELP.CUSTOM_CMD}`);

      if (cmd.category !== "custom") {
        aliases = cmd.aliases ? cmd.aliases.map((alias) => alias) : lang.GLOBAL.NONE;
        options = cmd.options ? cmd.options.map((option) => option) : lang.GLOBAL.NONE;
        cooldown = cmd.cooldown ? `${cmd.cooldown}s` : lang.GLOBAL.NONE;
        memberPerms = !cmd.memberPermissions
          ? lang.GLOBAL.NONE
          : [...cmd.memberPermissions].map((p) => p);

        botPerms = !cmd.botPermissions
          ? ["SEND_MESSAGES"].map((p) => p)
          : [...cmd.botPermissions, "SEND_MESSAGES"].map((p) => p);

        embed
          .setDescription("")
          .addField(lang.HELP.ALIASES, aliases, true)
          .addField(lang.HELP.COOLDOWN, `${cooldown}`, true)
          .addField("Usage", cmd.usage ? `${prefix}${cmd.usage}` : lang.GLOBAL.NOT_SPECIFIED, true)
          .addField(lang.UTIL.CATEGORY, cmd.category, true)
          .addField(
            lang.UTIL.DESCRIPTION,
            cmd.description ? cmd.description : lang.GLOBAL.NOT_SPECIFIED,
            true
          )
          .addField(lang.HELP.OPTIONS, options, true)
          .addField("Bot Permissions", botPerms, true)
          .addField("Member Permissions", memberPerms, true);
      }

      return message.channel.send(embed);
    }

    const cates = [];

    for (let i = 0; i < categories.length; i++) {
      const category = commands
        .filter(({ category }) => category === categories[i])
        .map(({ name }) => name);

      cates.push(category);
    }

    const embed = BaseEmbed(message);

    for (let i = 0; i < cates.length; i++) {
      const name = lang.HELP.CATEGORIES[categories[i]];

      if (["nsfw", "hentainsfw"].includes(categories[i]) && !nsfw) {
        embed.addField(name, lang.HELP.NSFW_ONLY);
      } else if (categories[i] === "botowner" && !isBotOwner) {
        embed.addField(name, lang.HELP.OWNER_ONLY);
      } else {
        embed.addField(name, `\`\`\`${cates[i].join(", ")}\`\`\``);
      }
    }

    embed
      .addField(`${lang.HELP.GUILD_PREFIX}: `, prefix)
      .setDescription(lang.HELP.CMD_DESC.replace("{prefix}", prefix))
      .setTitle("Help");

    message.channel.send(embed);
  },
};
