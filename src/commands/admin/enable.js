const BaseEmbed = require("../../modules/BaseEmbed");
const { updateGuildById, getGuildById } = require("../../utils/functions");
const categories = require("../../data/categories.json");

module.exports = {
  name: "enable",
  description: "Enables a command",
  category: "exempt",
  memberPermissions: ["ADMINISTRATOR"],
  requiredArgs: ["command name | category name"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const option = args[0];
    const guild = await getGuildById(message.guild.id);

    if (!option) {
      return message.channel.send(lang.ADMIN.PROVIDE_COMMAND_OR_CATEGORY_NAME);
    }

    const command =
      bot.commands.get(option.toLowerCase()) || bot.commands.get(bot.aliases.get(option));

    if (!command) {
      // enable category
      const category = option.toLowerCase();
      if (!categories.includes(category)) {
        return message.channel.send(lang.ADMIN.COMMAND_OR_CATEGORY_NOT_FOUND);
      }

      if (!guild.disabled_categories.includes(category)) {
        return message.channel.send(lang.ADMIN.CATEGORY_NOT_DISABLED);
      }

      await updateGuildById(message.guild.id, {
        disabled_categories: guild.disabled_categories.filter((c) => c !== category),
      });

      const embed = BaseEmbed(message)
        .setTitle(lang.ADMIN.ENABLED_CATEGORY)
        .setDescription(lang.ADMIN.CATEGORY_ENABLED.replace("{category}", category));

      return message.channel.send(embed);
    } else {
      // enable command
      if (!command?.name) {
        return message.channel.send(lang.ADMIN.COMMAND_NOT_FOUND);
      }

      if (!guild.disabled_commands.includes(command.name)) {
        return message.channel.send(lang.ADMIN.COMMAND_NOT_DISABLED);
      }

      await updateGuildById(message.guild.id, {
        disabled_commands: guild.disabled_commands.filter((c) => c !== command.name),
      });

      const embed = BaseEmbed(message)
        .setTitle(lang.ADMIN.ENABLED_COMMAND)
        .setDescription(lang.ADMIN.COMMAND_ENABLED.replace("{commandName}", command.name));

      return message.channel.send(embed);
    }
  },
};
