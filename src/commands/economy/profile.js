const { MessageEmbed } = require("discord.js");
const {
  getUserXp,
  getUserMoney,
  getUserBank,
  getUserInventory,
  getServerPrefix,
} = require("../../utils/functions");

module.exports = {
  name: "profile",
  description: "See the full profile of a user",
  category: "economy",
  cooldown: 2,
  async execute(bot, message) {
    const user = message.mentions.users.first() || message.author;
    const userId = user.id;
    const guildId = message.guild.id;
    const userXp = (await getUserXp(guildId, userId)) || 0;
    const money = (await getUserMoney(guildId, userId)) || 0;
    const bank = (await getUserBank(guildId, userId)) || 0;
    const level = Math.floor(0.1 * Math.sqrt(userXp));
    const inventory = (await getUserInventory(guildId, userId)) || [];
    const serverPrefix = await getServerPrefix(guildId);

    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s profile`)
      .addField("**XP**", userXp, true)
      .addField("**Money**", money, true)
      .addField("**Bank**", bank, true)
      .addField("**Level**", level, true)
      .addField("**Inventory Items**", inventory.length, true)
      .setDescription(
        `Use \`${serverPrefix}inventory <user>\` to view their inventory items.`
      )
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
