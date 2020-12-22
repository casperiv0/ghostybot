module.exports = {
  name: "invite",
  description: "Creates an instant invite for the server",
  category: "util",
  botPermissions: ["CREATE_INSTANT_INVITE"],
  aliases: ["inv"],
  async execute(_bot, message) {
    const invite = await message.channel.createInvite();

    return message.channel.send(`https://discord.gg/${invite.code}`);
  },
};
