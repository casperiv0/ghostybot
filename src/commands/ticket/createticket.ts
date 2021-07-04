import { Message, OverwriteResolvable, TextChannel, Permissions, Snowflake } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class CreateTicketCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "createticket",
      description: "Creates a ticket",
      category: "ticket",
      botPermissions: [Permissions.FLAGS.MANAGE_CHANNELS],
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const guild = await this.bot.utils.getGuildById(message.guild?.id);
      const tickets = message.guild?.channels.cache.filter((ch) =>
        ch.name.startsWith(lang.TICKET.TICKET.replace("#{Id}", "")),
      );
      if (!tickets) return;

      const ticketId = tickets.size + 1;
      let hasActiveTicket = false;

      if (!guild?.ticket_data.enabled) {
        return message.channel.send({
          content: lang.TICKET.NOT_ENABLED.replace(
            "{botName}",
            `${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}`,
          ),
        });
      }

      tickets.forEach((ch) => {
        if (!(ch as TextChannel).topic) return;
        if ((ch as TextChannel).topic?.includes(message.author.tag)) {
          return (hasActiveTicket = true);
        }
      });

      if (hasActiveTicket) {
        return message.channel.send({ content: lang.TICKET.ALREADY_ACTIVE_TICKET });
      }

      const DEFAULT_PERMS: OverwriteResolvable[] = [
        {
          id: message.author.id,
          allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
        },
        {
          id: this.bot.user?.id!,
          allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
        },
      ];

      if (guild.ticket_data?.role_id !== null && guild.ticket_data?.role_id !== "Disabled") {
        DEFAULT_PERMS.push({
          type: "role",
          id: guild.ticket_data.role_id as Snowflake,
          allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
        });
      }

      const parentId =
        guild.ticket_data.parent_id !== null && guild.ticket_data.parent_id !== "Disabled"
          ? guild.ticket_data.parent_id
          : undefined;

      const channel = await message.guild?.channels.create(
        lang.TICKET.TICKET.replace("{Id}", `${ticketId}`),
        {
          type: "text",
          nsfw: false,
          topic: lang.TICKET.TICKET_FOR.replace("{member}", message.author.tag),
          permissionOverwrites: DEFAULT_PERMS,
          parent: parentId as Snowflake | undefined,
        },
      );

      // @ts-expect-error ignore
      await channel?.permissionOverwrites.create(message.guild!.id, {
        VIEW_CHANNEL: false,
      });

      channel?.send({ content: `${lang.TICKET.CREATED} <@${message.author.id}>` });

      message.channel.send({
        content: `Ticket was successfully created in ${channel?.toString()}`,
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
