const {
  unsetWelcomeChannel,
  unsetLeaveChannel,
  unsetAuditChannel,
} = require("../../utils/functions");

module.exports = {
  name: "unset",
  description: "Unset/disable an option",
  usage: "unset <option>",
  aliases: ["disable"],
  options: ["welcome-channel", "leave-channel", "audit-channel"],
  category: "admin",
  execute(bot, message, args) {
    const option = args[0].toLowerCase();

    if (!option) return message.channel.send("Please provide a valid option!");

    switch (option) {
      case "welcome-channel":
        unsetWelcomeChannel(message.guild.id);
        message.channel.send("Successfully disabled welcome-channel");
        break;
      case "leave-channel":
        unsetLeaveChannel(message.guild.id);
        message.channel.send("Successfully disabled leave-channel");
        break;
      case "audit-channel":
        unsetAuditChannel(message.guild.id);
        message.channel.send("Successfully disabled audit-channel");
        break;
      default:
        message.channel.send(`${option} is not a valid option!`);
        break;
    }
  },
};
