module.exports = {
  name: "say",
  description: "Let the bot say something",
  category: "admin",
  memberPermissions: ["ADMINISTRATOR"],
  execute(bot, message, args) {
    message.delete();
    const msg = args.join(" ");

    message.channel.send(msg);
  },
};
