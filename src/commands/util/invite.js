module.exports = {
  name: "invite",
  description: "Get a random color",
  category: "util",
  botPermissions: ["CREATE_INSTANT_INVITE"],
  aliases: ["inv"],
  async execute(_bot, message) {
    const invite = await message.channel.createInvite();

    return message.channel.send(`https://discord.gg/${invite.code}`);
  },
};
