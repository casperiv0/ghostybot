module.exports = {
  name: "deafen",
  description: "Deafen a user",
  category: "admin",
  botPermissions: ["DEAFEN_MEMBERS"],
  memberPermissions: ["DEAFEN_MEMBERS"],
  async execute(bot, message, args) {
    const deafenUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    const deafenReason = args.join(" ").slice(23);

    if (deafenUser.voice.serverDeaf) {
      return message.channel.send(
        "User is not in a voice channel or isn't deafened"
      );
    }

    deafenUser.voice.setDeaf(true, "deafenReason");

    deafenUser.user.send(
      `You've been **Deafenned** from **${message.guild.name}**, Reason: **${deafenReason}**`
    );
    message.channel.send(
      `${deafenUser} was successfully deafenned from the server. Reason: **${deafenReason}**. I have also send a DM letting the person know.`
    );
  },
};
