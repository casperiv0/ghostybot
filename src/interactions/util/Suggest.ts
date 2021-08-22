import { hyperlink } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class SuggestCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "suggest",
      description: "Suggest something for this guild",
      options: [
        {
          name: "text",
          required: true,
          description: "The suggestion description",
          type: "STRING",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const suggestion = interaction.options.getString("text", true);
    const guild = await this.bot.utils.getGuildById(interaction.guildId!);
    const suggestChannel = guild?.suggest_channel;

    if (!suggestChannel) {
      return interaction.reply({ ephemeral: true, content: lang.UTIL.NO_SUGG_CHANNEL });
    }

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.UTIL.NEW_SUGGESTION)
      .setDescription(suggestion)
      .setAuthor(lang.UTIL.CREATED_BY.replace("{member}", interaction.user.tag));

    const channel = this.bot.channels.cache.get(suggestChannel);
    if (!channel) return;
    const sendMessage = await (channel as DJS.TextChannel).send({ embeds: [embed] });

    sendMessage.react("👍");
    sendMessage.react("👎");

    const url = hyperlink(lang.UTIL.SENT_SUG, sendMessage.url);

    await interaction.reply({ ephemeral: true, content: url });
  }
}
