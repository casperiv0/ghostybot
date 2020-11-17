const { getUserById, calculateUserXp } = require("../../utils/functions");

module.exports = {
  name: "level",
  description: "Get your current level",
  category: "levels",
  aliases: ["lvl", "rank"],
  async execute(bot, message, args) {
    const member = bot.findMember(message, args, true);
    const { user } = await getUserById(member.user.id, message.guild.id);

    const level = calculateUserXp(user.xp);
    const avatar = encodeURIComponent(member.user.displayAvatarURL());
    const isBoosting =
      member.premiumSinceTimestamp >= 1
        ? "&isBoosting=true"
        : "&isBoosting=false";

    const url = `https://vacefron.nl/api/rankcard?username=${encodeURIComponent(
      member.user.username
    )}&avatar=${avatar}&level=${level}&rank=${level}&currentxp=${
      user.xp
    }&nextlevelxp=${user.xp + 1200}&previouslevelxp=${
      user.xp
    }&custombg=2F3136&xpcolor=fff${isBoosting}`;

    message.channel.send(url);
  },
};
