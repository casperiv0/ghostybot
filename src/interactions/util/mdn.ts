import { CommandInteraction, MessageEmbed } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

export default class DocsInteraction extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "mdn",
      description: "Find something on the MDN Web Docs.",
      category: "util",
      options: [
        {
          name: "query",
          description: "What do you want to search for",
          type: "STRING",
          required: true,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guildId!);

    try {
      const query = interaction.options.getString("query", true);

      const url = `https://mdn.gideonbot.com/embed?q=${query}`;
      const data = await fetch(url).then((res) => res.json());

      if (!data || data?.message || data?.code) {
        return interaction.reply({ content: lang.UTIL.MDN_NOT_FOUND, ephemeral: true });
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
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply({ content: lang.GLOBAL.ERROR, ephemeral: true });
    }
  }
}
