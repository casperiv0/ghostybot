module.exports = {
  name: "starboardNoEmptyMsg",
  async execute(bot, emoji, message, user) {
    const lang = await bot.getGuildLang(message.guild.id);
    return message.channel.send(lang.EVENTS.STARBOARD_NOT_STAR.replace("{userTag}", user.tag));
  },
};