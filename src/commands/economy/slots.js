const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById, updateUserById } = require("../../utils/functions");
const items = ["🍒", "🍓", "🍉", "🍌", "🍪", "🍏", "🍎"];

module.exports = {
  name: "slots",
  description: "Slots machine",
  category: "economy",
  cooldown: 10,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const { user } = await getUserById(message.author.id, message.guild.id);
    const numbers = [];
    let amount = 0;
    let hasWon = false;

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
      amount = 500;
      hasWon = true;
    } else if (isOne) {
      amount = 300;
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
      embed.setTitle(lang.ECONOMY.LOST_SLOTS);
    }

    message.channel.send(embed);
  },
};
