const targetFile = "./docs/COMMANDS.md";
const fs = require("fs");

module.exports = (bot) => {
  const cmds = mapCommands(bot.commands);

  writeToFile(cmds, bot.commands.size);
};

function mapCommands(cmds) {
  return cmds
    .map((cmd) => {
      return commandItem(cmd);
    })
    .join("\n");
}

function commandItem(command) {
  return `## ${command.name}

**Category:** ${command.category}

**Description:** ${command.description || "N/A"}

**Usage:** ${`\`${command.usage || "N/A"}\``}

**Member Permissions:** ${
    !command.memberPermissions
      ? "None"
      : command.memberPermissions.map((p) => p).join(", ")
  }

**Bot Permissions:** ${
    !command.botPermissions
      ? "SEND_MESSAGES"
      : ["SEND_MESSAGES", ...command.botPermissions].map((p) => p).join(", ")
  }\n`;
}

function writeToFile(cmds, length) {
  const DEFAULT = `# Ghostybot Command list

  This command list was automatically generated in [this file](https://github.com/Dev-CasperTheGhost/ghostybot/tree/main/src/scripts/generateCommandList.js).
  GhostyBot has a total of ${length} commands
  
  ${cmds}
  `;

  fs.writeFileSync(targetFile, DEFAULT);
}
