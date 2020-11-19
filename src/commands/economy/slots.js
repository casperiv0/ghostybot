const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById, updateUserById } = require("../../utils/functions");
const items = ["🍒", "🍓", "🍉", "🍌", "🍪", "🍏", "🍎"];

module.exports = {
  name: "slots",
  description: "Slots machine",
  category: "economy",
  cooldown: 20,
  usage: "slots <amount>",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const { user } = await getUserById(message.author.id, message.guild.id);
    const numbers = [];
    let amount = args[0];
    let hasWon = false;

    if (amount > 500) {
      return message.channel.send(lang.ECONOMY.MAX_BET);
    }

    if (amount > user.money) {
      return message.channel.send(lang.ECONOMY.NOT_ENOUGH_MONEY);
    }

    if (amount && isNaN(amount)) {
      return message.channel.send(lang.LEVELS.PROVIDE_VALID_NR);
    }

    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * items.length);
      numbers[i] = random;
    }

    const isAll = numbers[0] === numbers[1] && numbers[1] === numbers[2];
    const isOne =
      numbers[0] === numbers[1] ||
      numbers[1] === numbers[2] ||
      numbers[0] === numbers[2];

    if (isAll) {
      amount = amount ? (amount *= 5) : 300;
      hasWon = true;
    } else if (isOne) {
      amount = amount ? (amount *= 3) : 150;
      hasWon = true;
    }

    let embed = BaseEmbed(message).setDescription(
      `${items[numbers[0]]} ${items[numbers[1]]} ${items[numbers[2]]}`
    );

    if (hasWon) {
      embed.setTitle(lang.ECONOMY.WON_SLOTS.replace("{amount}", amount));
      await updateUserById(message.author.id, message.guild.id, {
        money: user.money + amount,
      });
    } else {
      const removalCount = amount ? amount : 0;
      embed.setTitle(lang.ECONOMY.LOST_SLOTS);
      await updateUserById(message.author.id, message.guild.id, {
        money: user.money - removalCount,
      });
    }

    message.channel.send(embed);
  },
};
