const TARGET_FILE = "./docs/COMMANDS.md";
import fs from "fs";
import { Collection } from "discord.js";
import categoriesData from "../data/categories.json";
import Bot from "../structures/Bot";
import { dashboard } from "../../config.json";
import Command from "../structures/Command";

type Commands = Collection<string, Command>;

export default (bot: Bot) => {
  const detailedCommandList = mapDetailedCommands(bot.commands);
  const notDetailedCommandList = mapNotDetailedCommand(bot.commands);

  writeToFile(detailedCommandList, notDetailedCommandList, bot.commands.size);

  bot.logger.log("command_list", "Successfully generated command list");
};

function mapDetailedCommands(cmds: Commands) {
  return cmds
    .map((cmd) => {
      return commandItem(cmd);
    })
    .join("\n");
}

function mapNotDetailedCommand(cmds: Commands) {
  const categories: any = [];
  const filteredCategories = categoriesData.filter((c) => !["custom", "disabled"].includes(c));

  for (let i = 0; i < filteredCategories.length; i++) {
    const category = cmds
      .filter(({ options }) => options.category === filteredCategories[i])
      .map(({ options }) => ({ name: options.name, description: options.description }));

    categories.push(category);
  }

  return categories
    .map((cmds, i) => {
      return categoryItem(cmds, filteredCategories[i]);
    })
    .join("##");
}

function commandItem(command) {
  return `## ${command.name}

**Category:** ${command.category}

**Description:** ${command.description || "N/A"}

**Usage:** ${`\`${command.usage || "N/A"}\``}

**Member Permissions:** ${
    !command.memberPermissions ? "None" : command.memberPermissions.map((p) => p).join(", ")
  }

**Bot Permissions:** ${
    !command.botPermissions
      ? "SEND_MESSAGES"
      : ["SEND_MESSAGES", ...command.botPermissions].map((p) => p).join(", ")
  }

**Required Arguments:** ${
    command?.requiredArgs ? command?.requiredArgs.map((a) => `\`${a}\``).join(", ") : "N/A"
  }

[Back to top](#ghostybot-command-list)\n`;
}

function categoryItem(commands, categoryName) {
  return `
### Category: ${categoryName}

**Total commands: ${commands.length}**

${commands
  .map((cmd) => {
    return `[${cmd.name}:](#${cmd.name}) ${cmd.description || "N/A"}\n`;
  })
  .join("\n")}
  `;
}

function writeToFile(detailedCommandList, notDetailedCommandList, length) {
  const DEFAULT = `# ${dashboard.botName} Command list

This command list was automatically generated in [this file](https://github.com/Dev-CasperTheGhost/ghostybot/tree/main/src/scripts/generateCommandList.js).
${dashboard.botName} has a total of ${length} commands.

Click any of the command names for more information

## Command list

${notDetailedCommandList}

## Detailed command list
  
${detailedCommandList}
`;

  fs.writeFileSync(TARGET_FILE, DEFAULT);
}
