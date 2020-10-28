const {
  getBlacklistWords,
  setBlacklistWords,
  addBlacklistWord,
} = require("../../utils/functions");

module.exports = {
  name: "blacklistedwords",
  description: "Add/remove blacklisted words",
  category: "admin",
  options: ["get", "add", "remove"],
  async execute(bot, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.reply(
        "Sorry, You don't have the correct permissions for this command. (Administrator)"
      );
    }

    const option = args[0];
    const item = args[1];
    const guildId = message.guild.id;
    const blacklistWords = await getBlacklistWords(guildId);

    if (!option) {
      return message.channel.send("Please provide an option '`add`, `remove`'");
    }

    switch (option) {
      case "add": {
        if (blacklistWords.includes(item)) {
          return message.channel.send(
            `${item} already exist in blacklisted words`
          );
        }
        if (blacklistWords === null || !blacklistWords) {
          setBlacklistWords(guildId, [item]);
        } else {
          addBlacklistWord(guildId, item);
        }

        return message.channel.send(
          `Successfully added **${item}** to blacklisted words`
        );
      }
      case "remove": {
        if (blacklistWords !== null) {
          if (!blacklistWords.includes(item)) {
            return message.channel.send(
              `${item} does not exist in blacklisted words`
            );
          }

          const words = blacklistWords.filter(
            (w) => w.toLowerCase() !== item.toLowerCase()
          );

          setBlacklistWords(guildId, words);

          return message.channel.send(
            `Successfully removed **${item}** from blacklisted words`
          );
        } else {
          return message.channel.send("There are no blacklisted words yet.");
        }
      }
      case "get": {
        const words =
          blacklistWords !== null &&
          blacklistWords.map((w) => `\`${w}\``).join(", ");
        return message.channel.send(words || "no words were found");
      }
      default: {
        return message.channel.send(`${option} does not exist`);
      }
    }
  },
};
