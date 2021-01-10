module.exports = {
    name: "starboardNoEmptyMsg",
    async execute(bot, emoji, message, user) {
      return message.channel.send(`${user.tag}, you cannot star an empty message.`);
    },
  };
  