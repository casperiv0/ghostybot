const BaseEmbed = require("../../modules/BaseEmbed");
const {
  getGuildById,
  getUserById,
  calculateUserXp,
} = require("../../utils/functions");

module.exports = {
  name: "profile",
  description: "See the full profile of a user",
  category: "economy",
  cooldown: 2,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const userId = member.id;
    const guildId = message.guild.id;
    const { user } = await getUserById(userId, guildId);
    const guild = await getGuildById(guildId);

    const { money, bank, inventory, xp } = user;
    const level = calculateUserXp(xp);

    const embed = BaseEmbed(message)
      .setTitle(`${member.user.username} ${lang.ECONOMY.PROFILE}`)
      .addField(`**${lang.LEVELS.XP}**`, xp, true)
      .addField(`**${lang.LEVELS.LEVEL}**`, level, true)
      .addField(`**${lang.ECONOMY.MONEY}**`, money, true)
      .addField(`**${lang.ECONOMY.BANK}**`, bank, true)
      .addField(`**${lang.ECONOMY.INV_ITEMS}**`, inventory.length, true)
      .setDescription(
        lang.ECONOMY.VIEW_INVENTORY.replace("{prefix}", guild.prefix)
      );

    message.channel.send({ embed });
  },
};
