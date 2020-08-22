module.exports = {
  name: "botinvite",
  description: "Returns the bot invite",
  category: "util",
  execute(bot, message) {
    const botInvite =
      "https://discord.com/oauth2/authorize?client_id=632843197600759809&scope=bot&permissions=8";

    return message.channel.send(`Invite me here! ${botInvite}`);
  },
};
