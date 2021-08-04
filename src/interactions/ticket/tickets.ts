import {
  Permissions,
  CommandInteraction,
  OverwriteResolvable,
  TextChannel,
  Snowflake,
} from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

export default class TicketsCommand extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "tickets",
      description: "Create or close a ticket",
      category: "ticket",
      botPermissions: [Permissions.FLAGS.MANAGE_CHANNELS],

      options: [
        {
          type: "SUB_COMMAND",
          name: "create",
          description: "Open a new ticket",
        },
        {
          type: "SUB_COMMAND",
          name: "close",
          description: "Close your ticket",
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const command = interaction.options.getSubcommand(true);

      if (command === "create") {
        await this.createTicket(interaction, lang);
      } else {
        await this.closeTicket(interaction, lang);
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");

      interaction.deferred
        ? interaction.editReply(lang.GLOBAL.ERROR)
        : interaction.reply({ content: lang.GLOBAL.ERROR, ephemeral: true });
    }
  }

  async createTicket(
    interaction: CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const guild = await this.bot.utils.getGuildById(interaction.guild?.id);
    const ticketChannels = interaction.guild?.channels.cache.filter((ch) =>
      ch.name.startsWith(lang.TICKET.TICKET.replace("#{Id}", "")),
    );
    if (!ticketChannels) return;

    const ticketId = ticketChannels.size + 1;
    let hasActiveTicket = false;

    if (!guild?.ticket_data.enabled) {
      return interaction.reply({
        ephemeral: true,
        content: lang.TICKET.NOT_ENABLED.replace(
          "{botName}",
          `${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]}`,
        ),
      });
    }

    ticketChannels.forEach((ch) => {
      if (!(ch as TextChannel).topic) return;
      if ((ch as TextChannel).topic?.includes(interaction.user.tag)) {
        return (hasActiveTicket = true);
      }
    });

    if (hasActiveTicket) {
      return interaction.reply({ ephemeral: true, content: lang.TICKET.ALREADY_ACTIVE_TICKET });
    }

    const DEFAULT_PERMS: OverwriteResolvable[] = [
      {
        id: interaction.user.id,
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

    const channel = await interaction.guild?.channels.create(
      lang.TICKET.TICKET.replace("{Id}", `${ticketId}`),
      {
        type: "GUILD_TEXT",
        nsfw: false,
        topic: lang.TICKET.TICKET_FOR.replace("{member}", interaction.user.tag),
        permissionOverwrites: DEFAULT_PERMS,
        parent: parentId as Snowflake | undefined,
      },
    );

    await channel?.permissionOverwrites.create(interaction.guild!.id, {
      VIEW_CHANNEL: false,
    });

    channel?.send({ content: `${lang.TICKET.CREATED} <@${interaction.user.id}>` });

    interaction.reply({
      ephemeral: true,
      content: lang.TICKET.CREATED_IN.replace("{channel}", channel?.toString()!),
    });
  }

  async closeTicket(
    interaction: CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const channel = await interaction.guild?.channels.fetch(interaction.channelId);

    if (!(channel as TextChannel).name.startsWith(lang.TICKET.TICKET.replace("#{Id}", ""))) {
      return interaction.reply({ ephemeral: true, content: lang.TICKET.CANNOT_DO_ACTION });
    }

    this.bot.emit("guildTicketClose", channel, interaction.user);
    channel?.delete();
  }
}
