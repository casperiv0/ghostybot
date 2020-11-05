const cowsPack = require("cows");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "cow",
  description: "Returns a cow ascii",
  category: "animal",
  async execute(bot, message) {
    const cows = cowsPack();

    const cow = cows[Math.floor(Math.random() * cows.length)];

    const embed = BaseEmbed(message)
      .setTitle("Cow")
      .setDescription(`\`\`\`${cow}\`\`\``);

    message.channel.send(embed);
  },
};
