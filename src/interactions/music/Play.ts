import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class PlayCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "music",
      name: "play",
      description: "Play a song",
      options: [
        {
          description: "The URL or query to the song",
          name: "query",
          required: true,
          type: DJS.ApplicationCommandOptionType.String,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const query = interaction.options.getString("query", true);
    const queue = this.bot.player.getQueue(interaction.guildId!);
    if (queue && !this.bot.utils.isBotInSameChannel(interaction)) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.BOT_NOT_IN_VC });
    }

    const member = await this.bot.utils.findMember(interaction, [interaction.user.id], {
      allowAuthor: true,
    });
    const channel = member?.voice.channel;

    if (!channel) {
      return { ok: false, error: { ephemeral: true, content: lang.MUSIC.MUST_BE_IN_VC } };
    }

    const perms = channel.permissionsFor(this.bot.user!);
    if (!perms?.has([DJS.PermissionFlagsBits.Connect, DJS.PermissionFlagsBits.Speak])) {
      return { ok: false, error: { ephemeral: true, content: lang.MUSIC.NO_PERMS } };
    }

    await interaction.reply({ ephemeral: true, content: lang.MUSIC.ADDED_TO_QUEUE2 });
    await this.bot.player.play(channel, query, {
      textChannel: interaction.channel as DJS.GuildTextBasedChannel,
      member,
    });
  }
}
