const { ownerId } = require("../../../config.json");

module.exports = {
  name: "nickname",
  description: "Set the bot's nick name in a guild",
  category: "botowner",
  async execute(bot, message, args) {
    if (message.author.id !== ownerId)
      return message.reply("Only the owner is allowed to run this command");

    const nickname = args.join(" ");

    message.guild.members.cache
      .get(bot.user.id)
      .setNickname(nickname, "Updated by bot-owner");

    message.channel.send(`Successfully updated bot' nickname to **${nickname}**`);
  },
};
