const { MessageEmbed } = require("discord.js");
const { feedBackChannelId } = require("../../../config.json");

module.exports = {
<<<<<<< HEAD
    name: "feedback",
    description: "Give feedback about the bot",
    category: "util",
    execute(bot, message, args) {
        const feedback = args.join(" ");

        if (!feedback) return message.channel.send("If u wanna be nice please give some feedback.");

        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${message.author.username} New Feedback`)
            .setDescription(feedback)
            .setFooter(message.author.username)
            .setTimestamp();

        bot.channels.cache.get(feedBackChannelId).send(embed);

    }
};

// is this for the entire bot? or for a guild?
//ima do resetxp first as pr
// okay
=======
  name: "feedback",
  description: "Give feedback about the bot",
  category: "util",
  execute(bot, message, args) {
    const feedback = args.join(" ");

    if (!feedback)
      return message.channel.send(
        "If u wanna be nice please give some feedback."
      );

    if (!feedBackChannelId || feedBackChannelId === "") return;

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`${message.author.username} New Feedback`)
      .setDescription(feedback)
      .setFooter(message.author.username)
      .setTimestamp();

    bot.channels.cache.get(feedBackChannelId).send(embed);

    message.channel.send("Successfully send feedback!");
  },
};
>>>>>>> 91a522f1c99949c7047af0036772d7d5cf1f08f5
