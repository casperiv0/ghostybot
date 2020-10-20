const {
  unsetWelcomeChannel,
  unsetLeaveChannel,
  unsetWelcomeRole,
  unsetModLog,
} = require("../../utils/functions");

module.exports = {
  name: "unset",
  description: "Unset/disable an option",
  usage: "unset <option>",
  aliases: ["disable"],
  options: [
    "welcome-channel",
    "leave-channel",
    "audit-channel",
    "welcome-role",
    "mod-log",
  ],
  category: "admin",
  async execute(bot, message, args) {
    const w = await message.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "GhostyBot");
    const option = args[0].toLowerCase();

    if (!option) return message.channel.send("Please provide a valid option!");

    switch (option) {
      case "welcome-channel":
        unsetWelcomeChannel(message.guild.id);
        break;
      case "leave-channel":
        unsetLeaveChannel(message.guild.id);
        break;
      case "audit-channel":
        if (!webhook)
          return message.reply(
            "Cannot reset this! As there is no webhook for logging"
          );
        if (webhook) {
          webhook.delete();
          message.channel.send("Succesfully reset logging!");
        }
        break;
      case "welcome-role":
        unsetWelcomeRole(message.guild.id);
        break;
      case "mod-log":
        unsetModLog(message.guild.id);
        break;
      default:
        return message.channel.send(`\`${option}\` is not a valid option!`);
    }

    return message.channel.send(`Successfully disabled \`${option}\` `);
  },
};
