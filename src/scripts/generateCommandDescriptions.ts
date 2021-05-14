import fs from "fs";
import Command from "../structures/Command";

export async function generateCommandDescriptions(commands: Command[]) {
  const descriptions: Record<string, string> = {};

  commands.forEach((command) => {
    const descriptionKey = command.name.toUpperCase();
    const description = command.options.description ?? "";

    descriptions[descriptionKey] = description;
  });

  fs.writeFileSync("descriptions_data.json", JSON.stringify(descriptions, null, 2));
}
