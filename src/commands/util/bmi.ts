import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BmiCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "bmi",
      description: "Calculate your BMI",
      usage: "<weight in kilograms> <height in centimeters>",
      category: "util",
      requiredArgs: [
        { name: "weight", type: "number" },
        { name: "height", type: "number" },
      ],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [weight, height] = args;

      const bmi = (+weight / ((+height * +height) / 10000)).toFixed(2);

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${message.author.username} ${lang.UTIL.BMI}`)
        .addField(`${lang.UTIL.BMI_WEIGHT}`, `${weight}kg`)
        .addField(`${lang.UTIL.BMI_HEIGHT}`, `${height}cm`)
        .addField(`${lang.UTIL.BMI}`, bmi);

      message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
