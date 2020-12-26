const fetch = require("node-fetch");

module.exports = {
  name: "magik",
  description: "Just Magik",
  category: "image",
  async execute(bot, message, args) {
    const member = bot.findMember(message, args, true);

    let intensity = args[1] || Math.floor(Math.random() * 10);
    if (member.user.id === message.author.id) {
      intensity = args[0] || Math.floor(Math.random() * 10);
    }

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=magik&intensity=${intensity}&image=${member.user.displayAvatarURL(
        {
          format: "png",
        }
      )}`
    ).then((res) => res.json());

    message.channel.send(data.message);
  },
};
