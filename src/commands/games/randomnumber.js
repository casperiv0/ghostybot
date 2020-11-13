module.exports = {
  name: "randomnumber",
  description: "Returns a random 6 digit number",
  category: "games",
  execute(bot, message) {
    const n = Math.floor(Math.random() * 1000000) + 1;

    message.channel.send(n);
  },
};
