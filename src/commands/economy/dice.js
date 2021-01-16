const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "dice",
  description: "Roll a dice",
  category: "economy",
  cooldown: 5,
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const { user } = await bot.utils.getUserById(message.author.id, message.guild.id);
    const roll = Math.floor(Math.random() * 6) + 1;
    const price = 200;

    const embed = bot.utils.baseEmbed(message).setTitle(
      `🎲 ${lang.ECONOMY.DICE_LANDED.replace("{roll}", roll)}`
    );

    if (roll === 6) {
      embed.setDescription(
        `🎉 ${lang.ECONOMY.DICE_WON.replace("{price}", price)}`
      );
      bot.utils.updateUserById(message.author.id, message.guild.id, {
        money: user.money + price,
      });
    } else {
      embed.setDescription(
        `❌ ${lang.ECONOMY.DICE_LOST.replace("{price}", price)}`
      );
    }

    message.channel.send(embed);
  },
};
