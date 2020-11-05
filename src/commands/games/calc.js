const math = require("mathjs");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "calc",
  description: "Calculate something",
  category: "games",
  aliases: ["math"],
  execute(bot, message, args) {
    try {
      const calculation = math.evaluate(args.join(" "));

      const embed = BaseEmbed(message)
        .setTitle("Calculator")
        .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
        .addField("Output:", `\`\`\`js\n${calculation}\`\`\``);

      message.channel.send(embed);
    } catch (e) {
      return message.channel.send("Invalid calculation");
    }
  },
};
