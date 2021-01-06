const { updateGuildById } = require("../../utils/functions");

module.exports = {
  name: "unset",
  description: "Unset/disable an option",
  usage: "<option>",
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
    const lang = await bot.getGuildLang(message.guild.id);
    const w = await message.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === bot.user.username);
    let option = args[0];
    const guildId = message.guild.id;

    if (!option) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_OPTION);
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
          return message.reply(lang.ADMIN.CANNOT_RESET);
        if (webhook) {
          webhook.delete();
          message.channel.send(lang.ADMIN.SUC_RESET);
        }
        break;
      default:
        return message.channel.send(lang.GLOBAL.NOT_AN_OPTION);
    }

    return message.channel.send(lang.ADMIN.COMMAND_DISABLED.replace("{commandName}", `\`${option}\``));
  },
};

async function updateItem(type, guildId) {
  await updateGuildById(guildId, {
    [type]: null,
  });
}
