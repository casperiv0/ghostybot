import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/BaseCommand";
import { SubCommand } from "structures/Command/SubCommand";

const loopTypes = [
  { value: 0, name: "0 (Disabled)" },
  { value: 1, name: "1 (Repeat song)" },
  { value: 2, name: "2 (Repeat entire queue)" },
];

export default class LoopCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "music",
      name: "loop",
      description: "Loop a song that is playing",
      options: [
        {
          type: "INTEGER",
          name: "type",
          required: true,
          description: "The loop type",
          choices: loopTypes,
        },
      ],
    });

    this.didEnableFilter = this.didEnableFilter.bind(this);
  }

  async validate(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ): Promise<ValidateReturn> {
    const member = await this.bot.utils.findMember(interaction, [interaction.user.id], {
      allowAuthor: true,
    });

    if (!member?.voice.channel) {
      return { ok: false, error: { ephemeral: true, content: lang.MUSIC.MUST_BE_IN_VC } };
    }

    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const type = interaction.options.getInteger("type", true);

    const queue = this.bot.player.getQueue(interaction.guildId!);
    if (!queue || !queue.playing) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
    }

    if (queue && !this.bot.utils.isBotInSameChannel(interaction)) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.BOT_NOT_IN_VC });
    }

    this.bot.player.setRepeatMode(interaction.guildId!, Number(type));

    await interaction.reply({ content: "🔁" });
  }

  didEnableFilter(interaction: DJS.CommandInteraction, filterToCheck: string): boolean {
    const queueFilters = this.bot.player.getQueue(interaction.guildId!)?.filters;

    return !queueFilters?.includes(filterToCheck) ?? true;
  }
}
