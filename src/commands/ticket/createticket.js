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

    if (!guild.ticket_data.enabled) {
      return message.channel.send(
        "Tickets are not enabled for this guild! An administrator can enable it in GhostyBot's settings"
      );
    }

    tickets.forEach((ch) => {
      if (!ch.topic) return;
      if (ch.topic.includes(message.author.tag)) {
        return (hasActiveTicket = true);
      }
    });

    if (hasActiveTicket === true) {
      return message.channel.send(lang.TICKET.ALREADY_ACTIVE_TICKET);
    }

    const DEFAULT_PERMS = [
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
        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
      },
    ];

    const channel = await message.guild.channels.create(`ticket-#${ticketId}`, {
      type: "text",
      nsfw: false,
      topic: lang.TICKET.TICKET_FOR.replace("{member}", message.author.tag),

      permissionOverwrites: DEFAULT_PERMS,
    });

    if (guild.ticket_data.parent_id !== null && guild.ticket_data.parent_id !== "Disabled") {
      channel.setParent(guild.ticket_data.parent_id);
    }

    if (guild.ticket_data.role_id !== null && guild.ticket_data.role_id !== "Disabled") {
      channel.overwritePermissions([
        ...DEFAULT_PERMS,
        {
          id: guild.ticket_data.role_id,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        },
      ]);
    }

    channel.send(`${lang.TICKET.CREATED} <@${message.author.id}>`);
  },
};
