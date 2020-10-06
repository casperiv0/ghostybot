const canvas = require("discord-canvas"),
  Discord = require("discord.js");
const { getLeaveChannel } = require("../utils/functions");

module.exports = {
  name: "guildMemberRemove",
  async execute(bot, member) {
    const leaveChannel = await getLeaveChannel(member.guild.id);

    if (leaveChannel !== null || leaveChannel) {
      if (
        !member.guild.channels.cache.some((ch) => ch.name === leaveChannel.name)
      )
        return;

      const user = bot.users.cache.get(member.id);

      let image = await new canvas.Goodbye()
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
        "goodbye-image.png"
      );

      bot.channels.cache
        .get(leaveChannel.id)
        .send(
          `**${user.usernme}#${user.discriminator}** just left us.`,
          attachment
        );
    }
  },
};
