const BaseEmbed = require("../../modules/BaseEmbed");
const { updateGuildById, getGuildById } = require("../../utils/functions");
const categories = require("../../data/categories.json");

module.exports = {
  name: "disable",
  description: "Disables a command",
  category: "exempt",
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const option = args[0];
    const saveCommands = ["help", "enable", "disable"];
    const saveCategories = ["botowner", "exempt"];

    if (!option) {
      return message.channel.send("Please provide a command or category name");
    }

    const command = bot.commands.get(option.toLowerCase());
    const guild = await getGuildById(message.guild.id);

    if (!command) {
      // Disable category
      const category = option.toLowerCase();
      if (!categories.includes(category)) {
        return message.channel.send("Category or command was not found");
      }

      if (saveCategories.includes(category)) {
        return message.channel.send("That category cannot be disabled!");
      }

      if (guild.disabled_categories.includes(category)) {
        return message.channel.send("That category is already disabled");
      }

      await updateGuildById(message.guild.id, {
        disabled_categories: [...guild.disabled_categories, category],
      });

      const embed = BaseEmbed(message)
        .setTitle("Disabled category")
        .setDescription(`Successfully **disabled** ${category}`);

      return message.channel.send(embed);
    } else {
      // disable command
      if (saveCommands.includes(command.name)) {
        return message.channel.send("That command cannot be disabled");
      }

      if (guild.disabled_commands.includes(command.name)) {
        return message.channel.send("That command is already disabled");
      }

      await updateGuildById(message.guild.id, {
        disabled_commands: [...guild.disabled_commands, command.name],
      });

      const embed = BaseEmbed(message)
        .setTitle("Disabled command")
        .setDescription(`Successfully **disabled** ${command.name}`);

      return message.channel.send(embed);
    }
  },
};
