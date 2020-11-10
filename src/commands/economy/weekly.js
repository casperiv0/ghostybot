const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "weekly",
  description: "Collect your weekly price",
  category: "economy",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const { user } = await getUserById(message.author.id, message.guild.id);
    const timeout = 604800000; /* 1 week timeout */
    const amount = 1000;
    const weekly = user.weekly;

    if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
      message.channel.send(lang.ECONOMY.WEEKLY_ERROR);
    } else {
      await updateUserById(message.author.id, message.guild.id, {
        money: user.money + amount,
        weekly: Date.now(),
      });

      message.channel.send(
        lang.ECONOMY.WEEKLY_SUCCESS.replace("{amount}", amount)
      );
    }
  },
};
