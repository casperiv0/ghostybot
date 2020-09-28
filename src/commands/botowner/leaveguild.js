

module.exports = {
  name: "leaveguild",
  description: "Leaves a guid by the provided Id",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, message, args) {

    const guildId = args[0];

    if (!guildId) {
      return message.channel.send("Please provide an id");
    }

    const guild = bot.guilds.cache.find((g) => g.id === guildId);

    if (!guild) {
      return message.channel.send("That guild wasn't found");
    }

    try {
      await guild.leave();
      message.channel.send(`Successfully left guild: **${guild.name}**`);
    } catch (e) {
      console.error(e);
      return message.channel.send("An error occurred leaving that guild");
    }
  },
}
