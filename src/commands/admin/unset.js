const { updateGuildById } = require("../../utils/functions");

module.exports = {
  name: "unset",
  description: "Unset/disable an option",
  usage: "unset <option>",
  options: [
    "welcome-channel",
    "leave-channel",
    "audit-channel",
    "welcome-role",
    "level-messages",
  ],
  category: "admin",
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const w = await message.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === bot.user.username);
    let option = args[0];
    const guildId = message.guild.id;

    if (!option) {
      return message.channel.send("Please provide a valid option!");
    }

    option = option.toLowerCase();

    switch (option) {
      case "welcome-channel":
        updateItem("welcome_channel", guildId);
        break;
      case "leave-channel":
        updateItem("leave_channel", guildId);
        break;
      case "welcome-role":
        updateItem("welcome_role", guildId);
        break;
      case "suggest-channel":
        updateItem("suggest_channel", guildId);
        break;
      case "level-messages":
        updateItem("level_up_messages", guildId);
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
      default:
        return message.channel.send(`\`${option}\` is not a valid option!`);
    }

    return message.channel.send(`Successfully disabled \`${option}\` `);
  },
};

async function updateItem(type, guildId) {
  await updateGuildById(guildId, {
    [type]: null,
  });
}
