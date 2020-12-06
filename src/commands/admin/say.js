const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "say",
  description: "Let the bot say something",
  category: "admin",
  memberPermissions: ["ADMINISTRATOR"],
  execute(bot, message, args) {
    const type = args[0];
    let msg = args.join(" ");

    message.delete();

    if (type === "embed") {
      msg = args.slice(1).join(" ");
      const embed = BaseEmbed(message).setDescription(msg);
      return message.channel.send(embed);
    }

    message.channel.send(msg);
  },
};
