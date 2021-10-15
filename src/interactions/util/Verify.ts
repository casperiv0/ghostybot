import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Command } from "structures/Command/Command";

export default class VerifyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "verify",
      description: "Verify yourself to indicate you're not a bot and to get guild access.",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const guild = await this.bot.utils.getGuildById(interaction.guildId);
    const member = await this.bot.utils.findMember(interaction, [interaction.user.id]);

    if (guild?.verify_data.enabled) {
      const isCorrectChannel = interaction.channelId === guild.verify_data.channel_id;

      if (isCorrectChannel) {
        if (!guild.verify_data.role_id) return;

        if (member?.roles.cache.has(guild.verify_data.role_id)) {
          await interaction.reply({
            ephemeral: true,
            content: lang.UTIL.ALREADY_VERIFIED,
          });
        } else {
          member?.roles.add(guild.verify_data.role_id);

          interaction.reply({
            content: "Verified ✅!",
            ephemeral: true,
          });
        }
      } else {
        interaction.reply({
          ephemeral: true,
          content: lang.UTIL.VERIFY_CHANNEL.replace(
            "{channel}",
            `<#${guild.verify_data.channel_id}>`,
          ),
        });
      }
    } else {
      return interaction.reply({ ephemeral: true, content: lang.UTIL.VERIFY_NOT_ENABLED });
    }
  }
}
