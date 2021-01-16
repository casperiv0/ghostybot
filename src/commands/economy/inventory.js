const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "inventory",
  description: "View your or a user inventory",
  category: "economy",
  usage: "<user>",
  aliases: ["inv"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const member = await bot.utils.findMember(message, args, true);

    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }

    const { user } = await bot.utils.getUserById(member.id, message.guild.id);
    const inventory = user?.inventory;

    if (!inventory || !inventory?.[0]) {
      return message.channel.send(lang.ECONOMY.INV_EMPTY);
    }

    const mapped = inventory?.map((item) => item).join(",\n ");

    const embed = bot.utils.baseEmbed(message)
      .setTitle(`${member.user.username} ${lang.ECONOMY.INVENTORY}`)
      .setDescription(`${mapped}`);

    message.channel.send({ embed });
  },
};
