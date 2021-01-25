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

interface Category {
  name: string;
  description: string | undefined;
}

function mapNotDetailedCommand(cmds: Commands) {
  const categories: Category[][] = [];
  const filteredCategories = categoriesData.filter((c) => !["custom", "disabled"].includes(c));

  for (let i = 0; i < filteredCategories.length; i++) {
    const category: Category[] = cmds
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

function commandItem(command: Command) {
  return `## ${command.name}

**Category:** ${command.options.category}

**Description:** ${command.options.description || "N/A"}

**Usage:** ${`\`${command.options.usage || "N/A"}\``}

**Aliases:** ${
    command.options.aliases?.map((value) => {
      return `\`${value}\``;
    }) || "N/A"
  }

**Member Permissions:** ${
    !command.options.memberPermissions
      ? "None"
      : command.options.memberPermissions.map((p) => p).join(", ")
  }

**Bot Permissions:** ${
    !command.options.botPermissions
      ? "SEND_MESSAGES"
      : ["SEND_MESSAGES", ...command.options.botPermissions].map((p) => p).join(", ")
  }

**Required Arguments:** ${
    command.options.requiredArgs
      ? command.options.requiredArgs
          .map((a) => `\`${a.name}${a.type ? `(${a.type})` : "(string)"}\``)
          .join(", ")
      : "N/A"
  }

[Back to top](#ghostybot-command-list)\n`;
}

function categoryItem(commands: Category[], categoryName: string) {
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

function writeToFile(detailedCommandList: string, notDetailedCommandList: string, length: number) {
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
