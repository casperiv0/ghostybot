const {
  getWarningUsers,
  setWarningUsers,
  addWarningUser,
} = require("../../utils/functions");

module.exports = {
  name: "warn",
  description: "Warns a user",
  category: "admin",
  async execute(bot, message, args) {
    const guildId = message.guild.id;
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

    const data = {
      user: member.user,
      reason: reason,
    };
    let existingWarnings = await getWarningUsers(guildId);

    if (existingWarnings === null) {
      setWarningUsers(guildId, [data]);
    }

    const warnings = await getWarningUsers(guildId);
    const userWarnings = warnings.filter((w) => w.user.id === member.user.id);

    addWarningUser(guildId, data);

    return message.channel.send(
      `${member.user.tag} was warned with reason: ${reason} (Total warnings: ${
        userWarnings ? userWarnings.length + 1 : "0"
      })`
    );
  },
};
