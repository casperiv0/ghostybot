const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "eval",
  description: "Eval",
  category: "botowner",
  ownerOnly: true,
  aliases: ["e"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const toEval = args.join(" ");
    try {
      let evaled = await eval(toEval);
      const eevaled = typeof evaled;
      evaled = require("util").inspect(evaled, {
        depth: 0,
        maxArrayLength: null,
      });
      const type = eevaled[0].toUpperCase() + eevaled.slice(1);

      const embed = BaseEmbed(message).setTitle(lang.BOT_OWNER.EVAL)
        .setDescription(`\`${lang.BOT_OWNER.EVAL_TYPE}:\` ${type}
\`${lang.BOT_OWNER.EVAL_INPUT}:\` \`\`\`js\n${toEval} \`\`\`
\`${lang.BOT_OWNER.EVAL_OUTPUT}:\` \`\`\`js\n${evaled}\`\`\``);

      message.channel.send(embed);
    } catch (error) {
      const errorEmbed = BaseEmbed(message)
        .setTitle(lang.GLOBAL.EVAL_ERROR)
        .setDescription(`\`\`\`${error}\`\`\``);

      message.channel.send(errorEmbed);
    }
  },
};
