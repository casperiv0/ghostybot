import { Message, Snowflake, TextChannel, VoiceChannel, Constants } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";
import { bold, time } from "@discordjs/builders";

const voiceChannel: (keyof typeof Constants.ChannelTypes)[] = ["GUILD_VOICE", "GUILD_STAGE_VOICE"];

export default class ChannelInfoCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "channelinfo",
      description: "Get information about a channel",
      category: "util",
      aliases: ["channel"],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const channel =
        message.mentions.channels.first() ||
        message.guild?.channels.cache.get(args[0] as Snowflake) ||
        message.channel;

      const topic = (channel as TextChannel)?.topic ?? lang.GLOBAL.NONE;
      const type = lang.UTIL.CHANNEL_TYPES[channel?.type.toUpperCase()];

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${(channel as TextChannel)?.name}`)
        .setDescription(
          `
${bold(lang.MEMBER.ID)}: ${channel.id}
${bold(lang.BOT_OWNER.EVAL_TYPE)}: ${type}
${bold(lang.UTIL.CHANNEL_TOPIC)}: ${topic}
${bold(lang.MEMBER.CREATED_ON)}: ${time(new Date(channel.createdAt), "F")}
`,
        );

      if (voiceChannel.includes(channel.type)) {
        const regions = lang.OTHER.REGIONS;
        const region = regions[(channel as VoiceChannel)?.rtcRegion ?? "us-central"];

        embed.addField(lang.GUILD.REGION, region);
      }

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
