module.exports = {
  name: "deafen",
  description: "Deafen a user",
  category: "admin",
  botPermissions: ["DEAFEN_MEMBERS"],
  memberPermissions: ["DEAFEN_MEMBERS"],
  requiredArgs: ["member", "reason"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const deafenMember = bot.findMember(message, args);
    const deafenReason = args.slice(1).join(" ");

    if (!deafenMember) {
      return message.channel.send(lang.MEMBER.NOT_FOUND);
    }

    if (deafenMember.voice.serverDeaf) {
      return message.channel.send(lang.ADMIN.DEAFEN_ALREADY_DEAFENED);
    }

    deafenMember.voice.setDeaf(true, "deafenReason");

    deafenMember.user.send(
      lang.ADMIN.DEAFEN_SUCCESS_DM.replace("{guild}", message.guild.name).replace(
        "{reason}",
        deafenReason
      )
    );
    message.channel.send(
      lang.ADMIN.DEAFEN_SUCCESS.replace("{member}", deafenMember).replace("{reason}", deafenReason)
    );
  },
};
