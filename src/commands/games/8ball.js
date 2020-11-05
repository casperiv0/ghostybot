const answers = require("../../data/8ball.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "8ball",
  description: "8Ball",
  category: "games",
  execute(bot, message, args) {
    const question = args.join(" ");

    if (!question)
      return message.channel.send("Please provide a valid question");

    const answer = answers[Math.floor(Math.random() * answers.length)];

    const embed = BaseEmbed(message)
      .setTitle("8Ball")
      .addField("Question:", question)
      .addField("Answer:", answer);

    message.channel.send(embed);
  },
};
