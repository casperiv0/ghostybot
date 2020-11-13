module.exports = {
  name: "ctopic",
  description: "Update the channel topic",
  category: "admin",
  botPermissions: ["MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_CHANNELS"],
  async execute(bot, message, args) {
    let channel = message.mentions.channels.first();
    let topic;
    if (!channel) {
      channel = message.channel;
      topic = args.join(" ");
    } else {
      topic = args.slice(1).join(" ").trim();
    }

    if (!topic) return message.reply("Please provide a new topic");

    await channel.setTopic(topic);
    await message.channel.send(
      `Successfully updated channel topic to ${topic}`
    );
  },
};
