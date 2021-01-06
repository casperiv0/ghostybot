const { updateGuildById } = require("../../utils/functions");

module.exports = {
  name: "setwelcomemsg",
  description: "Sets the welcome msg",
  category: "admin",
  usage: "<message>",
  requiredArgs: ["message"],
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const msg = args.join(" ");

    await updateGuildById(message.guild.id, {
      welcome_message: msg,
    });

    return message.channel.send(lang.ADMIN.UPDATE_WEL_MES);
  },
};
