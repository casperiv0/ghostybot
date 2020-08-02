const {
  addUserMoney,
  setUserDaily,
  getUserDaily,
} = require("../../utils/functions");

module.exports = {
  name: "daily",
  description: "daily",
  category: "economy",
  async execute(bot, message) {
    const user = message.author;
    const timeout = 86400000;
    const amount = 500;

    const daily = await getUserDaily(message.guild.id, user.id);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      message.channel.send("You have already collected your daily!");
    } else {
      message.channel.send(`You collected your daily of **${amount}** coins`);
      addUserMoney(message.guild.id, user.id, amount);
      setUserDaily(message.guild.id, user.id, Date.now());
    }
  },
};
