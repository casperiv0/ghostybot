module.exports = {
  name: "shutdown",
  description: "Shuts the bot down",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    
    await message.channel.send(lang.BOT_OWNER.SHUTDOWN);
    process.exit(1);
  },
};
