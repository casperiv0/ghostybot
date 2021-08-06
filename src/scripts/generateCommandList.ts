const TARGET_FILE = "./docs/COMMANDS.md";
import fs from "fs";
import { ApplicationCommandOptionData, Collection } from "discord.js";
import { Bot } from "structures/Bot";
import { Interaction } from "structures/Interaction";

type Commands = Collection<string, Interaction>;

export default (bot: Bot) => {
  const detailedCommandList = mapDetailedCommands(bot.interactions);

  writeToFile(detailedCommandList, bot.utils.commandCount);

  bot.logger.log("command_list", "Successfully generated command list");
};

function mapDetailedCommands(cmds: Commands) {
  return cmds.map((cmd) => subCommandsItem(cmd)).join("\n");
}

function subCommandsItem(command: Interaction) {
  const subCommands = command.options.options?.filter((v) => v.type === "SUB_COMMAND") ?? [];
  const groupCommands = parseGroupCommands(command) ?? [];

  return [...subCommands, ...groupCommands]?.map(subCommandItem.bind(null, command)).join("\n");
}

function subCommandItem(cmd: Interaction, value: ApplicationCommandOptionData) {
  const groupName = cmd.options.options?.find(
    (v) => v.type === "SUB_COMMAND_GROUP" && v.options?.some((v) => v.name === value.name),
  );

  return `## ${cmd.name}${groupName ? `-> ${groupName.name}` : ""} -> ${value.name}

**Description:** ${value.description}

**Choices:** ${value.choices?.map((v) => v.name).join(", ") || "N/A"}

**Options:** ${
    value.options
      ? value.options
          .map((v) => {
            const requiredText = v.required ? "Required" : "Optional";

            return `${v.name} (${v.type} / ${requiredText})`;
          })
          .join(", ")
      : "N/A"
  }

[Back to top](#ghostybot-command-list)\n`;
}

function writeToFile(detailedCommandList: string, length: number) {
  const DEFAULT = `# ${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} Command list

> **This list only shows slash commands! Regular are considered deprecated for GhostyBot. We're working hard to transition the last batch of regular commands to slash commands.**

This command list was automatically generated in [this file](https://github.com/Dev-CasperTheGhost/ghostybot/tree/main/src/scripts/generateCommandList.ts).
${process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"]} has a total of ${length} slash commands.

## Detailed command list

${detailedCommandList}`;

  fs.writeFileSync(TARGET_FILE, DEFAULT);
}

function parseGroupCommands(command: Interaction) {
  const groupCommands = command.options.options
    ?.filter((v) => v.type === "SUB_COMMAND_GROUP")
    ?.flatMap((v) => {
      return v.options?.filter((v) => v.type === "SUB_COMMAND");
    });

  return groupCommands as ApplicationCommandOptionData[] | undefined;
}
