module.exports = {
  name: "starboardAlreadyStarred",
  async execute(bot, emoji, message, user) {
    const lang = await bot.getGuildLang(message.guild.id);
    return message.channel.send(lang.EVENTS.STARBOARD_MESSAGE.replace("{userTag}", user.tag));
  },
};
