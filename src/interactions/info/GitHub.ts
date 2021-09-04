import * as DJS from "discord.js";
import { hyperlink } from "@discordjs/builders";
import fetch from "node-fetch";
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
          type: "STRING",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();
    const username = interaction.options.getString("username", true);

    const url = `${this.APIs.GitHub}${encodeURIComponent(username)}`;
    const user = (await fetch(url).then((res) => res.json())) as any;

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
      .addField("**Twitter**", twitter, true)
      .addField(`**${lang.UTIL.GH_FOLLOWING}**`, user.following.toString(), true)
      .addField(`**${lang.UTIL.GH_FOLLOWERS}**`, user.followers.toString(), true)
      .addField(`**${lang.UTIL.GH_WEBSITE}**`, website, true)
      .addField(`**${lang.UTIL.GH_LOCATION}**`, location, true)
      .addField(`${lang.GLOBAL.URL}`, user.html_url)
      .setDescription(`${lang.UTIL.GH_BIO}: ${bio}`)
      .setThumbnail(user.avatar_url);

    if (user.name) {
      embed.setAuthor(user.name);
    }

    await interaction.editReply({ embeds: [embed] });
  }
}
