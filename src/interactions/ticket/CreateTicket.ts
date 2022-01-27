import process from "node:process";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
import { OverwriteType } from "discord-api-types";

export default class CreateTicket extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "tickets",
      name: "create",
      description: "Open a new ticket",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_GUILD],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply({ ephemeral: true });

    const guild = await this.bot.utils.getGuildById(interaction.guild?.id);
    const ticketChannels = interaction.guild?.channels.cache.filter((ch) =>
      ch.name.startsWith(lang.TICKET.TICKET.replace("#{Id}", "")),
    );
    if (!ticketChannels) return;

    const ticketId = ticketChannels.size + 1;
    let hasActiveTicket = false;

    if (!guild?.ticket_data.enabled) {
      return interaction.editReply({
        content: this.bot.utils.translate(lang.TICKET.NOT_ENABLED, {
          botName: process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]!,
        }),
      });
    }

    ticketChannels.forEach((ch) => {
      if (!(ch as DJS.TextChannel).topic) return;
      if ((ch as DJS.TextChannel).topic?.includes(interaction.user.tag)) {
        return (hasActiveTicket = true);
      }
    });

    if (hasActiveTicket) {
      return interaction.editReply({ content: lang.TICKET.ALREADY_ACTIVE_TICKET });
    }

    const DEFAULT_PERMS: DJS.OverwriteResolvable[] = [
      {
        id: interaction.user.id,
        allow: [DJS.Permissions.FLAGS.VIEW_CHANNEL, DJS.Permissions.FLAGS.SEND_MESSAGES],
      },
      {
        id: this.bot.user?.id!,
        allow: [DJS.Permissions.FLAGS.VIEW_CHANNEL, DJS.Permissions.FLAGS.SEND_MESSAGES],
      },
    ];

    if (guild.ticket_data?.role_id !== null && guild.ticket_data?.role_id !== "Disabled") {
      DEFAULT_PERMS.push({
        type: OverwriteType.Role,
        id: guild.ticket_data.role_id as DJS.Snowflake,
        allow: [DJS.Permissions.FLAGS.VIEW_CHANNEL, DJS.Permissions.FLAGS.SEND_MESSAGES],
      });
    }

    const parentId =
      guild.ticket_data.parent_id !== null && guild.ticket_data.parent_id !== "Disabled"
        ? guild.ticket_data.parent_id
        : undefined;

    const channel = await interaction.guild?.channels.create(
      this.bot.utils.translate(lang.TICKET.TICKET, {
        Id: ticketId,
      }),
      {
        type: DJS.ChannelType.GuildText,
        nsfw: false,
        topic: this.bot.utils.translate(lang.TICKET.TICKET_FOR, { member: interaction.user.tag }),
        permissionOverwrites: DEFAULT_PERMS,
        parent: parentId as DJS.Snowflake | undefined,
      },
    );

    if (!channel) {
      return interaction.editReply({ content: lang.GLOBAL.ERROR });
    }

    await channel.permissionOverwrites.create(interaction.guild.id, {
      VIEW_CHANNEL: false,
    });

    channel.send({ content: `${lang.TICKET.CREATED} <@${interaction.user.id}>` });

    await interaction.editReply({
      content: this.bot.utils.translate(lang.TICKET.CREATED_IN, {
        channel: channel.toString(),
      }),
    });
  }
}
