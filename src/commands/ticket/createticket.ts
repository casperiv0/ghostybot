import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import { Message, OverwriteResolvable, TextChannel } from "discord.js";

export default class CreateTicketCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "createticket",
      description: "Creates a ticket",
      category: "ticket",
      botPermissions: ["MANAGE_CHANNELS"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const guild = await bot.utils.getGuildById(message.guild?.id);
      const tickets = message.guild?.channels.cache.filter((ch) =>
        ch.name.startsWith(lang.TICKET.TICKET.replace("#{Id}", ""))
      );
      if (!tickets) return;

      const ticketId = tickets.size + 1;
      let hasActiveTicket = false;

      if (!guild?.ticket_data.enabled) {
        return message.channel.send(
          lang.TICKET.NOT_ENABLED.replace("{botName}", bot.config.dashboard.botName)
        );
      }

      tickets.forEach((ch) => {
        if (!(ch as TextChannel).topic) return;
        if ((ch as TextChannel).topic?.includes(message.author.tag)) {
          return (hasActiveTicket = true);
        }
      });

      if (hasActiveTicket) {
        return message.channel.send(lang.TICKET.ALREADY_ACTIVE_TICKET);
      }

      const DEFAULT_PERMS: OverwriteResolvable[] = [
        {
          id: `${message.author.id}`,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        },
        {
          id: `${bot.user?.id}`,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        },
        {
          id: `${message.guild?.id}`,
          deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
        },
      ];

      const channel = ((await message.guild?.channels.create(
        lang.TICKET.TICKET.replace("{Id}", `${ticketId}`),
        {
          type: "text",
          nsfw: false,
          topic: lang.TICKET.TICKET_FOR.replace("{member}", message.author.tag),
          permissionOverwrites: DEFAULT_PERMS,
        }
      )) as unknown) as TextChannel;

      if (guild.ticket_data.parent_id !== null && guild.ticket_data.parent_id !== "Disabled") {
        channel?.setParent(guild.ticket_data.parent_id);
      }

      if (guild.ticket_data?.role_id !== null && guild.ticket_data?.role_id !== "Disabled") {
        (channel as TextChannel)?.overwritePermissions([
          ...DEFAULT_PERMS,
          {
            id: guild.ticket_data.role_id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
          },
        ]);
      }

      channel?.send(`${lang.TICKET.CREATED} <@${message.author.id}>`);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
