const { updateUserById } = require("../../utils/functions");

module.exports = {
  name: "reseteconomy",
  description: "Reset all money/bank in this guild",
  category: "economy",
  memberPermissions: ["MANAGE_GUILD"],
  aliases: ["reset-economy"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const filter = (m) => message.author.id === m.author.id;

    message.channel.send(lang.ECONOMY.RESET_CONF);

    message.channel
      .awaitMessages(filter, {
        time: 600000,
        max: 1,
        errors: ["time"],
      })
      .then(async (msgs) => {
        const msg = msgs.first();
        if (["y", "yes"].includes(msg.content.toLowerCase())) {
          const users = await message.guild.members.fetch();

          users.forEach(async (user) => {
            await updateUserById(user.id, message.guild.id, {
              money: 0,
              bank: 0,
            });
          });

          message.channel.send(lang.ECONOMY.RESET_SUCCESS);
        } else {
          message.channel.send(lang.ECONOMY.RESET_CANCEL);
        }
      })
      .catch((e) => {
        bot.logger.error("reset-economy", e?.stack || e);
        message.channel.send("An error occurred");
      });
  },
};
