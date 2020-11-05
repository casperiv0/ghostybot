const BaseEmbed = require("../../modules/BaseEmbed");
const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "dice",
  description: "Roll a dice",
  category: "economy",
  cooldown: 5,
  async execute(bot, message) {
    const { user } = await getUserById(message.author.id, message.guild.id);
    const roll = Math.floor(Math.random() * 6) + 1;
    const price = 200;

    const embed = BaseEmbed(message).setTitle(`🎲 You landed on: ${roll}`);

    if (roll === 6) {
      embed.setDescription(`🎉 Congrats! You won a price of **${price}coins**`);
      updateUserById(message.author.id, message.guild.id, {
        money: user.money + price,
      });
    } else {
      embed.setDescription(
        `You need to land a **6** to get a price of **${price}coins**`
      );
    }

    message.channel.send(embed);
  },
};
