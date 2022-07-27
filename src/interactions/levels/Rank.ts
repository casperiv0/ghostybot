import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class RankCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      name: "rank",
      commandName: "levels",
      description: "Get the rank of a user or yourself",
      options: [
        {
          name: "user",
          description: "A user",
          type: DJS.ApplicationCommandOptionType.User,
          required: false,
        },
      ],
    });
  }

  async execute(interaction: DJS.ChatInputCommandInteraction<"cached">) {
    const lang = await this.bot.utils.getGuildLang(interaction.guildId);

    const user = interaction.options.getUser("user") ?? interaction.user;
    if (user.bot) {
      return interaction.reply({ ephemeral: true, content: lang.MEMBER.BOT_DATA });
    }

    const dbUser = await this.bot.utils.getUserById(user.id, interaction.guildId!);
    if (!dbUser) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    const level = this.bot.utils.calculateXp(dbUser.xp);
    const avatar = encodeURIComponent(user.displayAvatarURL());

    const url = `${this.APIs.Rank}${encodeURIComponent(
      user.username,
    )}&avatar=${avatar}&level=${level}&rank=${level}&currentxp=${dbUser.xp}&nextlevelxp=${
      dbUser.xp + 1200
    }&previouslevelxp=${dbUser.xp}&custombg=2F3136&xpcolor=fff`;

    const attach = new DJS.AttachmentBuilder(url).setName("rank.png");

    await interaction.reply({
      files: [attach],
    });
  }
}
