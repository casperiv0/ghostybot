module.exports = {
  name: "ping",
  description: "pong!",
  category: "games",
  async execute(bot, message) {
    const firstMsg = await message.channel.send("🏓 Pong!");

    firstMsg.edit(
      `🏓 Pong \n Bot ping: ${Math.round(bot.ws.ping)}ms\nMessage Ping: ${
        firstMsg.createdTimestamp - message.createdTimestamp
      } `
    );
  },
};
