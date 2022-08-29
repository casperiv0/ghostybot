const TARGET_FILE = "./docs/COMMANDS.md";
import fs from "node:fs";
import { Collection } from "discord.js";
import { Bot } from "structures/Bot";
import { Command } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";
import { typeToString } from "utils/HandlersUtil";

type TCommand = Command | SubCommand;
type Commands = Collection<string, TCommand>;

export default (bot: Bot) => {
  const detailedCommandList = mapDetailedCommands(bot.interactions);

  writeToFile(detailedCommandList, bot.utils.commandCount);

  bot.logger.log("command_list", "Successfully generated command list");
};

function mapDetailedCommands(cmds: Commands) {
  return cmds.map((cmd) => subCommandItem(cmd)).join("\n");
}

function subCommandItem(cmd: TCommand) {
  const groupName = cmd instanceof SubCommand ? cmd.options.groupName : null;
  const topLevelName = cmd instanceof SubCommand ? cmd.options.commandName : "";

  return `## ${topLevelName}${groupName ? `-> ${groupName}` : ""}${topLevelName ? " -> " : ""}${
    cmd.name
  }

**Description:** ${cmd.options.description}

**Example usage:** ${makeUsage(topLevelName, groupName ?? null, cmd.name)}

**Options:** ${
    cmd.options.options
      ? cmd.options.options
          .map((v) => {
            const requiredText = "required" in v && v.required ? "Required" : "Optional";

            return `${v.name} (${typeToString(v.type)} / ${requiredText})`;
          })
          .join(", ")
      : "N/A"
  }

[Back to top](#ghostybot-command-list)\n`;
}

function makeUsage(topLevelName: string, groupName: string | null, name: string) {
  return `/${topLevelName ? `${topLevelName} ` : ""}${groupName ? `${groupName} ` : ""}${name} ...`;
}

function writeToFile(detailedCommandList: string, length: number) {
  const DEFAULT = `# ${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} Command list

> **This list only shows slash commands! Regular are considered deprecated for GhostyBot.**

This command list was automatically generated in [this file](https://github.com/Dev-CasperTheGhost/ghostybot/tree/main/src/scripts/generateCommandList.ts).
${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} has a total of ${length} slash commands.

## Detailed command list

${detailedCommandList}`;

  fs.writeFileSync(TARGET_FILE, DEFAULT);
}
