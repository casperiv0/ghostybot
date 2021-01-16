const { updateGuildById } = require("../../utils/functions");

module.exports = {
  name: "setwelcomemsg",
  description: "Sets the welcome msg",
  category: "admin",
  usage: "<message>",
  memberPermissions: ["MANAGE_GUILD"],
  requiredArgs: ["message"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const msg = args.join(" ");

    await updateGuildById(message.guild?.id, {
      welcome_message: msg,
    });

    return message.channel.send(lang.ADMIN.UPDATE_WEL_MES);
  },
};
