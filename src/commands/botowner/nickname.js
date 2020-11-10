module.exports = {
  name: "nickname",
  description: "Set the bot's nick name in a guild",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const nickname = args.join(" ");

    message.guild.members.cache
      .get(bot.user.id)
      .setNickname(nickname, lang.BOT_OWNER.UPDATE_NICKNAME);

    message.channel.send(
      lang.BOT_OWNER.UPDATED_NICKNAME.replace("{nickname}", nickname)
    );
  },
};
