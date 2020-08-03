const { MessageEmbed } = require("discord.js");

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

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username}'s BMI`)
      .setColor("BLUE")
      .addField("Weight", `${weight}kg`)
      .addField("Height", `${height}cm`)
      .addField("BMI", bmi);

    message.channel.send({ embed });
  },
};
