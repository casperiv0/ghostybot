module.exports = {
  name: "botinvite",
  description: "Returns the bot invite",
  category: "util",
  execute(bot, message) {
    const botInvite = `https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8`;

    return message.channel.send(botInvite);
  },
};
