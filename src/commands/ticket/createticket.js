module.exports = {
  name: "createticket",
  description: "Creates a ticket",
  category: "ticket",
  botPermissions: ["MANAGE_CHANNELS"],
  // cooldown: 15,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const guild = await bot.getGuildById(message.guild.id);
    const tickets = message.guild.channels.cache.filter((ch) => ch.name.startsWith("ticket-"));
    const ticketId = tickets.size + 1;
    let hasActiveTicket = false;

    tickets.forEach((ch) => {
      if (!ch.topic) return;
      if (ch.topic.includes(message.author.tag)) {
        return (hasActiveTicket = true);
      }
    });

    if (hasActiveTicket === true) {
      return message.channel.send(lang.TICKET.ALREADY_ACTIVE_TICKET);
    }

    const channel = await message.guild.channels.create(`ticket-#${ticketId}`, {
      type: "text",
      nsfw: false,
      topic: lang.TICKET.TICKET_FOR.replace("{member}", message.author.tag),

      permissionOverwrites: [
        {
          id: message.author.id,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        },
        {
          id: bot.user.id,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        },
        {
          id: message.guild.id,
          deny: ["VIEW_CHANNEL"],
        },
        !guild?.ticket_role || guild.ticket_role === "Disabled"
          ? {
              id: message.author.id,
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
            }
          : {
              id: guild?.ticket_role,
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
            },
      ],
    });

    if (guild.ticket_parent_channel !== null && guild.ticket_parent_channel !== "Disabled") {
      channel.setParent(guild.ticket_parent_channel);
    }

    channel.send(`${lang.TICKET.CREATED} <@${message.author.id}>`);
  },
};
