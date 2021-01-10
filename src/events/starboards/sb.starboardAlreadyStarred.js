module.exports = {
  name: "starboardAlreadyStarred",
  async execute(bot, emoji, message, user) {
    return message.channel.send(`${user.tag}, this message is already in the starboard`);
  },
};
