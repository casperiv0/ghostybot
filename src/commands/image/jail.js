const discord = require("discord.js")
const canvacord = require("canvacord")
module.exports = {
  name: "jail",
  category: "games",
  aliases: [""],
  description: "Get your pfp in a jail",
  async execute(client, message, args) {
    let avatar = message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL({size: 512, format: "png"}) : message.author.displayAvatarURL({size: 512, format: "png"})
    
    let image = await canvacord.jail(avatar)
    let attachment = new discord.MessageAttachment(image, "jail.png")
    message.channel.send(attachment)
  }
}
function match(msg, i) {
  if (!msg) return undefined;
  if (!i) return undefined;
  let user = i.members.cache.find(
    m =>
      m.user.username.toLowerCase().startsWith(msg) ||
      m.user.username.toLowerCase() === msg ||
      m.user.username.toLowerCase().includes(msg) ||
      m.displayName.toLowerCase().startsWith(msg) ||
      m.displayName.toLowerCase() === msg ||
      m.displayName.toLowerCase().includes(msg)
  );
  if (!user) return undefined;
  return user.user;
}
