const util = require("util");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "eval",
  description: "Eval",
  category: "botowner",
  ownerOnly: true,
  aliases: ["e"],
  async execute(bot, message, args) {
    const toEval = args.join(" ");
    if (!toEval) return message.channel.send("Please provide text");

    try {
      const evaluated = util.inspect(eval(toEval, { depth: 0 }));

      const embed = BaseEmbed(message)
        .setTitle("Eval Command")
        .addField("**Input:**", `\`\`\`${toEval}\`\`\``)
        .addField("**Output:**", ` \`\`\`${evaluated}\`\`\``);

      message.channel.send(embed);
    } catch (e) {
      return message.channel.send(`Something went wrong!  \`\`\`${e}\`\`\`  `);
    }
  },
};
