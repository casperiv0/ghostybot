import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class Rank extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      name: "rank",
      commandName: "levels",
      description: "Get the rank of a user or yourself",
      options: [
        {
          name: "user",
          description: "A user",
          type: "USER",
          required: false,
        },
      ],
    });
  }

  async execute(interaction: DJS.CommandInteraction) {
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

    const attach = new DJS.MessageAttachment(url, "rank.png");

    await interaction.reply({
      files: [attach],
    });
  }
}
