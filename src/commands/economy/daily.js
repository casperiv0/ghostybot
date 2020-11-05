const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "daily",
  description: "daily",
  category: "economy",
  async execute(bot, message) {
    const { user } = await getUserById(message.author.id, message.guild.id);
    const timeout = 86400000;
    const amount = 500;
    const currentMoney = user.money;
    const daily = user.daily;

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      message.channel.send("You have already collected your daily!");
    } else {
      updateUserById(message.author.id, message.guild.id, {
        daily: Date.now(),
        money: currentMoney + amount,
      });

      message.channel.send(`You collected your daily of **${amount}** coins`);
    }
  },
};
