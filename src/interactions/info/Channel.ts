import * as DJS from "discord.js";
import { bold, time } from "@discordjs/builders";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

const voiceChannel = ["GUILD_VOICE", "GUILD_STAGE_VOICE"];

export default class ChannelInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "channel",
      description: "Get information about a channel",
      options: [
        {
          description: "The channel you want more information about",
          name: "channel",
          required: false,
          type: "CHANNEL",
        },
      ],
    });
  }

  async validate(): Promise<ValidateReturn> {
    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const channel = interaction.options.getChannel("channel") ?? interaction.channel;

    if (!channel) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    const topic = (channel as DJS.TextChannel)?.topic ?? lang.GLOBAL.NONE;
    const type = lang.UTIL.CHANNEL_TYPES[channel.type];
    const createdAt =
      "createdAt" in channel ? time(new Date(channel.createdAt), "F") : lang.UTIL.UNKNOWN;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${(channel as DJS.TextChannel)?.name}`)
      .setDescription(
        `
${bold("ID")}: ${channel.id}
${bold(lang.BOT_OWNER.EVAL_TYPE)}: ${type}
${bold(lang.UTIL.CHANNEL_TOPIC)}: ${topic}
${bold(lang.MEMBER.CREATED_ON)}: ${createdAt}
  `,
      );

    if (voiceChannel.includes(channel.type as any)) {
      const regions = lang.OTHER.REGIONS;
      const region = regions[(channel as DJS.VoiceChannel)?.rtcRegion ?? "us-central"];

      embed.addField(lang.GUILD.REGION, region);
    }

    await interaction.reply({ embeds: [embed] });
  }
}
