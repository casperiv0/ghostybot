const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "block",
  description: "Write text with blocks",
  category: "games",
  execute(_bot, message, args) {
    const blocks = args
      .join(" ")
      .toLowerCase()
      .replace(/[a-z]/g, ":regional_indicator_$&:")
      .replace(/1/g, ":one:")
      .replace(/2/g, ":two:")
      .replace(/3/g, ":three:")
      .replace(/4/g, ":four:")
      .replace(/5/g, ":five:")
      .replace(/6/g, ":six:")
      .replace(/7/g, ":seven:")
      .replace(/8/g, ":eight:")
      .replace(/9/g, ":nine:")
      .replace(/0/g, ":zero:");

    const embed = BaseEmbed(message)
      .setTitle("Block Text")
      .setDescription(blocks);

    message.channel.send(embed);
  },
};
