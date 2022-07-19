import * as DJS from "discord.js";
import { hyperlink } from "@discordjs/builders";
import { request } from "undici";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class GitHubInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "github",
      description: "Get information about a GitHub user",
      options: [
        {
          description: "The GitHub username",
          name: "username",
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
    await interaction.deferReply();
    const username = interaction.options.getString("username", true);

    const url = `${this.APIs.GitHub}${encodeURIComponent(username)}`;
    const user = (await request(url).then((res) => res.body.json())) as any;

    if (user?.message === "Not Found") {
      return interaction.editReply({ content: lang.UTIL.GH_NOT_FOUND });
    }

    const twitter = user.twitter_username
      ? hyperlink(`@${user.twitter_username}`, `https://twitter.com/${user.twitter_username}`)
      : "N/A";

    const website = user.blog || "N/A";
    const location = user.location || "N/A";
    const bio = user.bio || "N/A";

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${user.login} ${lang.ECONOMY.PROFILE}`)
      .addFields(
        { name: "**Twitter**", value: twitter, inline: true },
        {
          name: `**${lang.UTIL.GH_FOLLOWING}**`,
          value: user.following.toString(),
          inline: true,
        },
        { name: `**${lang.UTIL.GH_FOLLOWERS}**`, value: user.followers.toString(), inline: true },
        {
          name: `**${lang.UTIL.GH_WEBSITE}**`,
          value: website,
          inline: true,
        },
        {
          name: `**${lang.UTIL.GH_LOCATION}**`,
          value: location,
          inline: true,
        },
        { name: `${lang.GLOBAL.URL}`, value: user.html_url },
      )
      .setDescription(`${lang.UTIL.GH_BIO}: ${bio}`)
      .setThumbnail(user.avatar_url);

    if (user.name) {
      embed.setAuthor({ name: user.name });
    }

    await interaction.editReply({ embeds: [embed] });
  }
}
