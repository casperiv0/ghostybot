module.exports = {
  name: "say",
  description: "Let the bot say something",
  category: "admin",
  memberPermissions: ["ADMINISTRATOR"],
  execute(bot, message, args) {
    const msg = args.join(" ");
    message.delete();

    message.channel.send(msg);
  },
};
