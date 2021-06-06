import { CommandInteraction, MessageEmbed } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

export default class DocsInteraction extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "docs",
      description: "Find something on the discord.js docs",
      options: [
        {
          name: "query",
          description: "What do you want to search for",
          type: "STRING",
          required: true,
        },
        {
          name: "branch",
          description: "The branch",
          type: "STRING",
          required: false,
          choices: [
            {
              name: "Stable",
              value: "stable",
            },
            {
              name: "Master",
              value: "master",
            },
          ],
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction, args: string[]) {
    const [query, branch = "stable"] = args;
    const lang = await this.bot.utils.getGuildLang(interaction.guildID!);

    const url = `https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${encodeURIComponent(query)}`;
    const data = await fetch(url).then((res) => res.json());

    if (!data?.message) {
      return interaction.reply({ content: lang.UTIL.DOC_NOT_FOUND });
    }

    const embed = new MessageEmbed({
      ...data,
      color: "#5865f2",
      footer: {
        text: interaction.user.username,
        icon_url: interaction.user?.displayAvatarURL({ dynamic: true }),
      },
    });

    return interaction.reply({ embeds: [embed] });
  }
}
