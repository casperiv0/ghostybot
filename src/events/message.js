const {
  getStickyData,
  getServerPrefix,
  sendToDev,
} = require("../utils/functions");

const queue = new Map();

module.exports = {
  name: "message",
  async execute(bot, message) {
    if (message.channel.type === "dm") return;
    const stickyData = await getStickyData(message.guild.id);
    const prefix = (await getServerPrefix(message.guild.id)) || "!"; //* Change using !prefix <new prefix>

    // Check if sticky
    const isSticky = message.channel.id === stickyData?.channelId;

    if (isSticky) {
      if (message.author.bot || message.content === stickyData.msg) return;

      const fMessage = message.channel.messages.cache.get(stickyData.id);
      if (fMessage) {
        fMessage.delete();
      }

      const stickyMessage = await message.channel.send(stickyData.msg);
      stickyData.id = stickyMessage.id;
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // music queue
    const serverQueue = queue.get(message.guild.id);

    try {
      const cmd =
        bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

      if (bot.commands.has(cmd?.name)) {
        cmd.execute(bot, message, args, serverQueue, queue);
      } else {
        console.log("Command not found");
      }
    } catch (e) {
      sendToDev(message, bot, e);
      console.log(e);
    }
  },
};
