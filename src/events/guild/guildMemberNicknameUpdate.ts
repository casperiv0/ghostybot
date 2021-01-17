import { GuildMember } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class GuildMemberNicknameUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMemberNicknameUpdate");
  }

  async execute(bot: Bot, member: GuildMember, oldNick: string, newNick: string) {
    try {
      if (!member.guild) return;
      if (!member.guild.available) return;
  
      const webhook = await bot.utils.getWebhook(member.guild);
      if (!webhook) return;
  
      const oldNickname = oldNick || "`None`";
      const newNickname = newNick || "`None`";
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTimestamp()
        .setColor("ORANGE")
        .setTitle("Member Update: `Nickname`")
        .setDescription(`${member}'s **nickname** was changed.`)
        .addField("Nickname", `${oldNickname} ➔ ${newNickname}`);
  
      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
