import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { hyperlink } from "@discordjs/builders";
import { Command } from "structures/Command/Command";
import categories from "assets/json/categories.json";

const HELP_URL_GH = "https://github.com/Dev-CasperTheGhost/ghostybot/blob/main/docs/COMMANDS.md";

export default class HelpInteraction extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "help",
      description: "Return more information about a command",
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    try {
      const LINK = hyperlink(lang.HELP.CLICK_ME, HELP_URL_GH);

      const menu = this.createSelectMenu();
      const actionRow =
        new DJS.ActionRowBuilder<DJS.MessageActionRowComponentBuilder>().addComponents(menu);

      const embed = this.bot.utils
        .baseEmbed({
          author: interaction.user,
        })
        .setDescription(
          `You can view all the slash commands [here](${HELP_URL_GH}). Due to some limitations it is hard to implement a new help command within Discord`,
        )
        .addFields({ name: lang.HELP.FULL_CMD_LIST, value: LINK });

      return interaction.reply({
        embeds: [embed],
        components: [actionRow],
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply({ content: lang.GLOBAL.ERROR, ephemeral: true });
    }
  }

  // todo: add function to find categories instead coming from a file
  // todo: add translations
  private createSelectMenu() {
    const menu = new DJS.SelectMenuBuilder()
      .setCustomId("HELP_CATEGORIES")
      .setPlaceholder("Select a category")
      .setMinValues(0)
      .setMaxValues(1);

    categories.forEach((category) => {
      menu.addOptions([
        {
          label: this.toCapitalize(category),
          description: `${this.toCapitalize(category)} commands`,
          value: category,
        },
      ]);
    });

    return menu;
  }

  private toCapitalize(str: string) {
    const split = str.split("");
    return `${split[0].toUpperCase()}${split.slice(1, str.length).join("")}`;
  }
}

export function handleCategories(interaction: DJS.SelectMenuInteraction, bot: Bot) {
  const category = interaction.values.toString();
  const commands = bot.interactions.filter((v) => {
    if ("commandName" in v.options) {
      return v.options.commandName === category;
    }

    return v.options.name === category;
  });

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${category} commands`)
    .setDescription(commands.map((command) => `\`${command.name}\``).join(" "))
    .addFields({
      name: "Note",
      value: `This does not include all commands within the ${category} category. [Please click here to view **all** commands.](${HELP_URL_GH})`,
    });

  interaction.reply({
    ephemeral: true,
    embeds: [embed],
  });
}
