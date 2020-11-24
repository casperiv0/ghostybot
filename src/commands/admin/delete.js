module.exports = {
  name: "delete",
  description: "Delete message, up to 100",
  usage: "delete <1-100>",
  aliases: ["purge", "clear"],
  category: "admin",
  memberPermissions: ["MANAGE_MESSAGES"],
  botPermissions: ["MANAGE_MESSAGES"],
  async execute(bot, message, args) {
    const amount = args[0];

    if (!amount) {
      return message.channel.send("Please provide a number");
    }

    if (isNaN(amount) || amount > 100) {
      return message.channel.send(
        "amount must be a valid number and below 100"
      );
    }

    try {
      await message.channel.bulkDelete(Number(amount)).then(() => {
        message.channel
          .send(`Deleted ${args[0]} messages.`)
          .then((msg) => msg.delete({ timeout: 2000 }, true));
      });
    } catch {
      return message.channel.send(
        "An error occurred when deleting the messages, make sure they are not older than 14days"
      );
    }
  },
};
