const { updateGuildById } = require("../../utils/functions");

module.exports = {
  name: "unset",
  description: "Unset/disable an option",
  usage: "<option>",
  options: ["welcome-channel", "leave-channel", "audit-channel", "welcome-role", "level-messages"],
  category: "admin",
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const w = await message.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === bot.user.username);
    let option = args[0];
    const guildId = message.guild.id;
    const guild = await bot.utils.getGuildById(guildId);

    if (!option) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_OPTION);
    }

    option = option.toLowerCase();

    switch (option) {
      case "welcome-channel":
        await updateGuildById(guildId, { welcome_data: { ...guild.welcome_data, enabled: false } });
        break;
      case "welcome-role":
        await updateGuildById(guildId, { welcome_data: { ...guild.welcome_data, enabled: false } });
        break;
      case "leave-channel":
        await updateGuildById(guildId, { leave_data: { ...guild.leave_data, enabled: false } });
        break;
      case "suggest-channel":
        updateItem("suggest_channel", guild);
        break;
      case "level-messages":
        await updateGuildById(guildId, { level_data: { ...guild.level_data, enabled: false } });
        break;
      case "audit-channel":
        if (!webhook) return message.reply(lang.ADMIN.CANNOT_RESET);
        if (webhook) {
          webhook.delete();
          message.channel.send(lang.ADMIN.SUC_RESET);
        }
        break;
      default:
        return message.channel.send(lang.GLOBAL.NOT_AN_OPTION);
    }

    return message.channel.send(
      lang.ADMIN.COMMAND_DISABLED.replace("{commandName}", `\`${option}\``)
    );
  },
};

async function updateItem(type, guild) {
  await updateGuildById(guild, {
    [type]: null,
  });
}
