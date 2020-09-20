const db = require("quick.db");

module.exports = {
  name: "delcmd",
  usage: "delcmd <cmd_name>",
  description: "Delete the custom commannd",
  category: "admin",
  aliases: ["removecmd"],
  execute(bot, message, args) {
    const cmdName = args[0];

    if (!cmdName)
      return message.channel.send(
        ":x: Gimm me command name, `delcmd <cmd_name>`"
      );

    const cmds = db.get(`cmds_${message.guild.id}`);

    if (cmds) {
      const data = cmds.find((cmd) => cmd.name === cmdName.toLowerCase());

      if (!data)
        return message.channel.send(":x: Unable to find this command.");

      const value = cmds.indexOf(data);
      delete cmds[value];

      const filter = cmds.filter((cmd) => {
        return cmd !== null && cmd !== "";
      });

      db.set(`cmds_${message.guild.id}`, filter);
      return message.channel.send(`Deleted the **${cmdName}** Command!`);
    } else {
      return message.channel.send(
        ":x: Sorry but i am unable to find that command!"
      );
    }
  },
};
