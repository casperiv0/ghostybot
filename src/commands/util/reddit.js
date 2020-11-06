const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "subreddit",
  description: "Returns a random reddit post",
  category: "util",
  async execute(bot, message, args) {
    const subReddit = args[0];

    if (!subReddit) {
      return message.channel.send("Please provide a subreddit.");
    }

    const data = await fetch(
      `https://www.reddit.com/r/${encodeURIComponent(subReddit)}/random.json`
    ).then((res) => res.json());

    try {
      const randomIndex = Math.floor(
        Math.random() * data[0].data.children.length
      );
      const children = data[0].data.children[randomIndex];
      const permaLink = children.data.permalink;
      const url = `https://reddit.com${permaLink}`;
      const image = children.data.url;

      const embed = BaseEmbed(message)
        .setTitle(children.data.subreddit)
        .setURL(url)
        .setImage(image);

      message.channel.send(embed);
    } catch {
      return message.channel.send(
        "Subreddit was not found or an error occurred"
      );
    }
  },
};
