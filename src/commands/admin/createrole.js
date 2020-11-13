const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "createrole",
  description: "This command creates a role with the name of what you say",
  category: "admin",
  botPermissions: ["MANAGE_ROLES"],
  memberPermissions: ["MANAGE_ROLES"],
  async execute(bot, message, args) {
    const roleName = args[0];
    if (!roleName) {
      message.channel.send("Please specify a role name!");
    }

    message.guild.roles.create({
      data: {
        name: roleName,
        color: "BLUE",
      },
    });

    const embed = BaseEmbed(message)
      .setTitle(`Created Role: ${roleName}`)
      .setDescription(`Successfully created the \`${roleName}\` role`);

      message.channel.send(embed);
  },
};
