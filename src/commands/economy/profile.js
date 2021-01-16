const BaseEmbed = require("../../modules/BaseEmbed");
const { calculateUserXp } = require("../../utils/functions");

module.exports = {
  name: "profile",
  description: "See the full profile of a user",
  category: "economy",
  cooldown: 2,
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const member = await bot.utils.findMember(message, args, true);

    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }

    const userId = member.id;
    const guildId = message.guild.id;
    const { user } = await bot.utils.getUserById(userId, guildId);
    const guild = await bot.utils.getGuildById(guildId);

    const { money, bank, inventory, xp } = user;
    const level = calculateUserXp(xp);

    const embed = bot.utils.baseEmbed(message)
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
