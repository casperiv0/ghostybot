const { getUserById, addWarning } = require("../../utils/functions");

module.exports = {
  name: "warn",
  description: "Warns a user",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send("You don't have permissions to do that!");
    }

    const reason = args.slice(1).join(" ");
    const member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.cache.get(args[0]);

    if (!member) {
      return message.channel.send("Please provide a valid user");
    }

    if (member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send("User can't be warned");
    }

    await addWarning(member.user.id, reason);

    const { warnings } = await getUserById(member.user.id, message.guild.id);

    return message.channel.send(
      `${member.user.tag} was warned with reason: ${reason} (Total warnings: ${
        warnings ? warnings.length + 1 : "0"
      })`
    );
  },
};
