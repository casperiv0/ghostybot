module.exports = {
  name: "closeticket",
  description: "Closes the active ticket, use --force to force close issue",
  category: "ticket",
  botPermissions: ["MANAGE_CHANNELS"],
  cooldown: 10,
  usage: "closeticket",
  async execute(bot, message, args) {
    const channel = message.channel;
    const lang = await bot.getGuildLang(message.guild.id);

    if (!channel.name.startsWith("ticket-")) {
      return message.channel.send(lang.TICKET.CANNOT_DO_ACTION);
    }

    if (args[0] && args[0].toLowerCase() === "--force") {
      await sendAuditLog(bot, channel, message.author);
      return channel.delete();
    }

    const timeout = 15000; /* 15 second timeout */
    const filter = (m) => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, { time: timeout });
    let canceled = false;

    message.channel.send(lang.TICKET.CLOSING);

    collector.on("collect", (msg) => {
      if (msg.content.toLowerCase() === "cancel") {
        canceled = true;

        collector.stop();
        return message.channel.send(lang.TICKET.WILL_NOT_CLOSE);
      }
    });

    setTimeout(async () => {
      if (canceled === false) {
        await sendAuditLog(bot, channel, message.author);
        channel.delete();
      }
    }, timeout);
  },
};

async function sendAuditLog(bot, channel, executor) {
  bot.emit("guildTicketClose", channel, executor);
}
