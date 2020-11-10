const math = require("mathjs");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "calc",
  description: "Calculate something",
  category: "games",
  aliases: ["math"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    try {
      const calculation = math.evaluate(args.join(" "));

      const embed = BaseEmbed(message)
        .setTitle(lang.GAMES.CALC)
        .addField(
          `${lang.BOT_OWNER.EVAL_INPUT}:`,
          `\`\`\`js\n${args.join(" ")}\`\`\``
        )
        .addField(
          `${lang.BOT_OWNER.EVAL_OUTPUT}:`,
          `\`\`\`js\n${calculation}\`\`\``
        );

      message.channel.send(embed);
    } catch (e) {
      return message.channel.send(lang.GAMES.INVALID_CALC);
    }
  },
};
