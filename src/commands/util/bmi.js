const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "bmi",
  description: "Calculate your BMI",
  usage: "bmi <weight in kilograms> <height in centimeters>",
  category: "util",
  execute(bot, message, args) {
    const weight = args[0];
    const height = args[1];

    if (!weight)
      return message.channel.send("Please provide your weight in kilograms");

    if (!height)
      return message.channel.send("Please provide your height in centimeters");

    const bmi = (weight / ((height * height) / 10000)).toFixed(2);

    const embed = BaseEmbed(message)
      .setTitle(`${message.author.username}'s BMI`)
      .addField("Weight", `${weight}kg`)
      .addField("Height", `${height}cm`)
      .addField("BMI", bmi);

    message.channel.send({ embed });
  },
};
