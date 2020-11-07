const BaseEmbed = require("../../modules/BaseEmbed");
const { updateGuildById, getGuildById } = require("../../utils/functions");

module.exports = {
  name: "enable",
  description: "Enables a command",
  category: "admin",
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const cmd = args[0];

    if (!cmd) {
      return message.channel.send("Please provide a command name");
    }

    const command = bot.commands.get(cmd.toLowerCase());

    if (!command?.name) {
      return message.channel.send("Command was not found");
    }

    const guild = await getGuildById(message.guild.id);

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
  },
};
