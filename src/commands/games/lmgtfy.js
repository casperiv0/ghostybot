module.exports = {
  name: "lmgtfy",
  description: "Let me google that for you",
  category: "games",
  usage: "lmgtfy <search query>",
  async execute(bot, message, args) {
    const query = encodeURIComponent(args.join(" "));
    const url = `https://lmgtfy.com/?q=${query}&s=g`;

    message.channel.send(url);
  },
};
