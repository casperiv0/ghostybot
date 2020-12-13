const { updateGuildById } = require("../../utils/functions");

module.exports = {
  name: "setwelcomemsg",
  description: "Sets the welcome msg",
  category: "admin",
  memberPermissions: ["ADMINISTRATOR"],
  async execute(bot, message, args) {
    const msg = args.join(" ");

    if (!msg) {
      return message.channel.send("Please provide a message");
    }

    await updateGuildById(message.guild.id, {
      welcome_message: msg,
    });

    return message.channel.send(
      "Successfully updated welcome message (please use dashboard for better experience)"
    );
  },
};
