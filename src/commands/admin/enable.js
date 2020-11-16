const BaseEmbed = require("../../modules/BaseEmbed");
const { updateGuildById, getGuildById } = require("../../utils/functions");
const categories = require("../../data/categories.json");

module.exports = {
  name: "enable",
  description: "Enables a command",
  category: "exempt",
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const option = args[0];
    const guild = await getGuildById(message.guild.id);

    if (!option) {
      return message.channel.send("Please provide a command or category name");
    }

    const command = bot.commands.get(option.toLowerCase());

    if (!command) {
      // enable category
      const category = option.toLowerCase();
      if (!categories.includes(category)) {
        return message.channel.send("Category or command was not found ");
      }

      if (!guild.disabled_categories.includes(category)) {
        return message.channel.send("That category is not disabled");
      }

      await updateGuildById(message.guild.id, {
        disabled_categories: guild.disabled_categories.filter(
          (c) => c !== category
        ),
      });

      const embed = BaseEmbed(message)
        .setTitle("Enabled category")
        .setDescription(`Successfully **enabled** ${category}`);

      return message.channel.send(embed);
    } else {
      // enable command
      if (!command?.name) {
        return message.channel.send("Command was not found");
      }

      if (!guild.disabled_commands.includes(command.name)) {
        return message.channel.send("That command is not disabled");
      }

      await updateGuildById(message.guild.id, {
        disabled_commands: guild.disabled_commands.filter(
          (c) => c !== command.name
        ),
      });

      const embed = BaseEmbed(message)
        .setTitle("Enabled command")
        .setDescription(`Successfully **enabled** ${command.name}`);

      return message.channel.send(embed);
    }
  },
};
