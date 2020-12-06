const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "say",
  description: "Let the bot say something",
  category: "admin",
  memberPermissions: ["ADMINISTRATOR"],
  execute(bot, message, args) {
    const type = args[0];
    const msg = args.slice(1).join(" ");

    if (!msg) {
      return message.channel.send("Please provide a message");
    }

    message.delete();

    if (type === "embed") {
      const embed = BaseEmbed(message).setDescription(msg);
      return message.channel.send(embed);
    }

    message.channel.send(msg);
  },
};
