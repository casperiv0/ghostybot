const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "avatar",
  description: "Get user avatar",
  category: "util",
  aliases: ["av"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);

    const png = avatar(member, "png");
    const webp = avatar(member, "webp");
    const jpg = avatar(member, "jpg");

    const embed = BaseEmbed(message)
      .setTitle(`${member.user.username} ${lang.UTIL.AVATAR}`)
      .setDescription(`[png](${png}) | [webp](${webp}) | [jpg](${jpg})`)
      .setImage(`${webp}`);

    message.channel.send(embed);
  },
};

function avatar(member, format) {
  return member.user.displayAvatarURL({
    dynamic: true,
    size: 1024,
    format,
  });
}
