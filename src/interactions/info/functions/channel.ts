import Bot from "structures/Bot";
import { bold, time } from "@discordjs/builders";
import * as DJS from "discord.js";

const voiceChannel = ["GUILD_VOICE", "GUILD_STAGE_VOICE"];

export async function channelInfo(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const channel = interaction.options.getChannel("channel") ?? interaction.channel;

  if (!channel) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  const topic = (channel as DJS.TextChannel)?.topic ?? lang.GLOBAL.NONE;
  const type = lang.UTIL.CHANNEL_TYPES[channel.type];
  const createdAt = "createdAt" in channel ? time(new Date(channel.createdAt), "F") : "Unknown";

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${(channel as DJS.TextChannel)?.name}`)
    .setDescription(
      `
${bold(lang.MEMBER.ID)}: ${channel.id}
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

  interaction.reply({ embeds: [embed] });
}
