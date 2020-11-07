const BaseEmbed = require("../../modules/BaseEmbed");
const { updateGuildById, getGuildById } = require("../../utils/functions");

module.exports = {
  name: "disable",
  description: "Disables a command",
  category: "admin",
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const cmd = args[0];

    if (!cmd) {
      return message.channel.send("Please provide a command name");
    }

    const command = bot.commands.get(cmd.toLowerCase());
    const guild = await getGuildById(message.guild.id);

    const saveCommands = ["help", "enable", "disable"];

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
  },
};
