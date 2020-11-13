const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "bmi",
  description: "Calculate your BMI",
  usage: "bmi <weight in kilograms> <height in centimeters>",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const weight = args[0];
    const height = args[1];

    if (!weight) {
      return message.channel.send(lang.UTIL.BMI_KG);
    }

    if (!height) {
      return message.channel.send(lang.UTIL.BMI_CM);
    }

    const bmi = (weight / ((height * height) / 10000)).toFixed(2);

    const embed = BaseEmbed(message)
      .setTitle(`${message.author.username} ${lang.UTIL.BMI}`)
      .addField(`${lang.UTIL.BMI_WEIGHT}`, `${weight}kg`)
      .addField(`${lang.UTIL.BMI_HEIGHT}`, `${height}cm`)
      .addField(`${lang.UTIL.BMI}`, bmi);

    message.channel.send({ embed });
  },
};
