
module.exports = {
  name: "nickname",
  description: "Set the bot's nick name in a guild",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, message, args) {

    const nickname = args.join(" ");

    message.guild.members.cache
      .get(bot.user.id)
      .setNickname(nickname, "Updated by bot-owner");

    message.channel.send(`Successfully updated bot' nickname to **${nickname}**`);
  },
};
