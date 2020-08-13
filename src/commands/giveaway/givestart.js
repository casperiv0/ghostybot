const {
  setGiveawayEndTime,
  setGiveawayPrice,
  getGiveawayUsers,
  addGiveawayUsers,
  removeGiveawayUsers,
} = require("../../utils/functions");

module.exports = {
  name: "givestart",
  description: "Start a giveaway",
  category: "giveaway",
  async execute(bot, message, args) {
    const endTime = args[0] * 3600000;
    const price = args.slice(endTime.length);
    const guildId = message.guild.id;
    const giveawayUsers = await getGiveawayUsers(guildId);

    setGiveawayEndTime(guildId, endTime);
    setGiveawayPrice(guildId, price);

    const filter = (reaction, user) => {
      return reaction.emoji.name === "🎉" && user.id === message.author.id;
    };

    const sendMsg = await message.channel.send("React to this message");

    const collector = sendMsg.createReactionCollector(filter);

    collector.on("collect", (reaction, user) => {
      const includes = giveawayUsers.filter((user) => user.id === user.id);
      if (includes) return;
      if (user.bot) return;

      addGiveawayUsers(guildId, user);
    });

    setTimeout(async () => {
      const updatedUsers = await getGiveawayUsers(guildId);
      const winner = selectWinner(updatedUsers);

      message.channel.send(`${winner.username} won!`);

      removeGiveawayUsers(guildId);
      setGiveawayEndTime(guildId, 0);
      setGiveawayPrice(guildId, "");
    }, endTime);
  },
};

function selectWinner(users) {
  const sorted = users.sort(() => Math.random() - 0.5);
  const randomI = Math.floor(Math.random() * users.length);

  return sorted[randomI];
}
