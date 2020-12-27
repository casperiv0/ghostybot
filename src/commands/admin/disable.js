const BaseEmbed = require("../../modules/BaseEmbed");
const { updateGuildById, getGuildById } = require("../../utils/functions");
const categories = require("../../data/categories.json");

module.exports = {
  name: "disable",
  description: "Disables a command",
  category: "exempt",
  memberPermissions: ["ADMINISTRATOR"],
  requiredArgs: ["command name | category name"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const option = args[0];
    const saveCommands = ["help", "enable", "disable"];
    const saveCategories = ["botowner", "exempt", "disabled", "custom"];
    const guild = await getGuildById(message.guild.id);

    if (!option) {
      return message.channel.send(lang.ADMIN.PROVIDE_COMMAND_OR_CATEGORY_NAME);
    }

    if (guild.custom_commands.find(({ name }) => name.toLowerCase() === option.toLowerCase())) {
      return message.channel.send(lang.ADMIN.COMMAND_CANNOT_DISABLED);
    }

    const command =
      bot.commands.get(option.toLowerCase()) || bot.commands.get(bot.aliases.get(option));

    if (!command) {
      // Disable category
      const category = option.toLowerCase();
      if (!categories.includes(category)) {
        return message.channel.send(lang.ADMIN.COMMAND_OR_CATEGORY_NOT_FOUND);
      }

      if (saveCategories.includes(category)) {
        return message.channel.send(lang.ADMIN.CATEGORY_CANNOT_DISABLED);
      }

      if (guild.disabled_categories.includes(category)) {
        return message.channel.send(lang.ADMIN.CATEGORY_ALREADY_DISABLED);
      }

      await updateGuildById(message.guild.id, {
        disabled_categories: [...guild.disabled_categories, category],
      });

      const embed = BaseEmbed(message)
        .setTitle(lang.ADMIN.DISABLED_CATEGORY)
        .setDescription(lang.ADMIN.CATEGORY_DISABLED.replace("{category}", category));

      return message.channel.send(embed);
    } else {
      // disable command
      if (saveCommands.includes(command.name)) {
        return message.channel.send(lang.ADMIN.COMMAND_CANNOT_DISABLED);
      }

      if (guild.disabled_commands.includes(command.name)) {
        return message.channel.send(lang.ADMIN.COMMAND_ALREADY_DISABLED);
      }

      await updateGuildById(message.guild.id, {
        disabled_commands: [...guild.disabled_commands, command.name],
      });

      const embed = BaseEmbed(message)
        .setTitle(lang.ADMIN.DISABLED_COMMAND)
        .setDescription(lang.ADMIN.COMMAND_DISABLED.replace("{commandName}", command.name));

      return message.channel.send(embed);
    }
  },
};
