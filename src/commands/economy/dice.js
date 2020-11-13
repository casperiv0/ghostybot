const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "dice",
  description: "Roll a dice",
  category: "economy",
  cooldown: 5,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const { user } = await getUserById(message.author.id, message.guild.id);
    const roll = Math.floor(Math.random() * 6) + 1;
    const price = 200;

    const embed = BaseEmbed(message).setTitle(
      `🎲 ${lang.ECONOMY.DICE_LANDED.replace("{roll}", roll)}`
    );

    if (roll === 6) {
      embed.setDescription(
        `🎉 ${lang.ECONOMY.DICE_WON.replace("{price}", price)}`
      );
      updateUserById(message.author.id, message.guild.id, {
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
