import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class AnnounceCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      name: "announce",
      description: "Announce something with a cool embed",
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_GUILD],
      options: [
        {
          name: "text",
          description: "The announcement message",
          type: "STRING",
          required: true,
        },
        {
          name: "channel",
          description: "A channel (Default: announcement channel set in dashboard)",
          type: "CHANNEL",
          required: false,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const text = interaction.options.getString("text", true);
    const channel = interaction.options.getChannel("channel");

    if (channel && !["GUILD_TEXT", "GUILD_NEWS", 0, 5].includes(channel.type)) {
      return interaction.reply({
        ephemeral: true,
        content: "Channel type must be type of `text` or `news`",
      });
    }
    const guild = await this.bot.utils.getGuildById(interaction.guildId!);
    const announceChannel = guild?.announcement_channel;

    const actualChannel = channel?.id ? channel.id : announceChannel;
    if (!actualChannel) {
      return interaction.reply({
        ephemeral: true,
        content:
          "You don't have an `announcement_channel` set in the dashboard, nor was there a channel provided via args.",
      });
    }

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.ADMIN.ANNOUNCEMENT)
      .setDescription(text);

    const ch = (await this.bot.channels
      .fetch(actualChannel)
      .catch(() => null)) as DJS.TextChannel | null;

    if (!ch) {
      return interaction.reply({
        content: lang.GLOBAL.ERROR,
        ephemeral: true,
      });
    }

    await interaction.reply({
      ephemeral: true,
      content: "Done!",
    });
    await ch.send({ embeds: [embed] });
  }
}
