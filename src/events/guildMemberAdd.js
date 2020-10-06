const canvas = require("discord-canvas"),
  Discord = require("discord.js");
const { getWelcomeChannel, getWelcomeRole } = require("../utils/functions");

module.exports = {
  name: "guildMemberAdd",
  async execute(bot, member) {
    const welcomeChannel = await getWelcomeChannel(member.guild.id);
    const welcomeRole = await getWelcomeRole(member.guild.id);

    // not enabled
    if (welcomeRole !== null || welcomeRole) {
      member.roles.add(welcomeRole.id);
    }

    if (welcomeChannel !== null || welcomeChannel) {
      if (
        !member.guild.channels.cache.some(
          (ch) => ch.name === welcomeChannel.name
        )
      )
        return;

      const user = bot.users.cache.get(member.id);

      let image = await new canvas.Welcome()
        .setUsername(`${user.username}`)
        .setDiscriminator(`${user.discriminator}`)
        .setGuildName(`${member.guild.name}`)
        .setMemberCount(`${member.guild.members.cache.size}`)
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setColor("border", "#4D5E94")
        .setBackground("https://wallpapercave.com/wp/wp2563380.jpg")
        .toAttachment();

      let attachment = new Discord.MessageAttachment(
        image.toBuffer(),
        "welcome-image.png"
      );

      bot.channels.cache
        .get(welcomeChannel.id)
        .send(
          `Hey **${member}**, Welcome to **${member.guild.name}**`,
          attachment
        );
    }
  },
};
