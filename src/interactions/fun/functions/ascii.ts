import * as DJS from "discord.js";
import figlet from "figlet";
import Bot from "structures/Bot";

export async function ascii(bot: Bot, interaction: DJS.CommandInteraction) {
  const text = interaction.options.getString("text", true);

  figlet.text(text, (e, txt) => {
    if (e) return;

    interaction.reply({
      content: bot.utils.codeContent(txt?.trimRight() ?? "UNKNOWN"),
    });
  });
}
