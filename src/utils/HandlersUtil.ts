import { resolve } from "node:path";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
import { Event } from "structures/Event";
import { Feature } from "structures/Feature";
import { Helper } from "structures/Helper";
import { Command } from "structures/Command/Command";
import { ApplicationCommandOptionType } from "discord.js";

type Structures = Event | Feature | Helper | SubCommand | Command;

export async function resolveFile<T>(file: string, bot: Bot): Promise<T | null> {
  const resolvedPath = resolve(file);

  const File = await (await import(resolvedPath)).default;

  if (!File?.constructor) {
    return null;
  }

  return new File(bot) as T;
}

export async function validateFile(file: string, item: Structures) {
  const type = getType(item);

  if (!item.name) {
    throw new TypeError(`[ERROR][${type}]: name is required for ${type}! (${file})`);
  }

  if (!item.execute) {
    throw new TypeError(`[ERROR][${type}]: execute function is required for ${type}! (${file})`);
  }
}

function getType(item: Structures) {
  if (item instanceof Event) {
    return "EVENT";
  }
  if (item instanceof Feature) {
    return "FEATURE";
  }
  if (item instanceof Helper) {
    return "HELPER";
  }
  if (item instanceof Command) {
    return "COMMAND";
  }
  if (item instanceof SubCommand) {
    return "SUB_COMMAND";
  }
}

export function typeToString(type: ApplicationCommandOptionType): string {
  switch (type) {
    case ApplicationCommandOptionType.Subcommand:
      return "Subcommand";
    case ApplicationCommandOptionType.SubcommandGroup:
      return "SubcommandGroup";
    case ApplicationCommandOptionType.String:
      return "String";
    case ApplicationCommandOptionType.Integer:
      return "Integer";
    case ApplicationCommandOptionType.Boolean:
      return "Boolean";
    case ApplicationCommandOptionType.User:
      return "User";
    case ApplicationCommandOptionType.Channel:
      return "Channel";
    case ApplicationCommandOptionType.Role:
      return "Role";
    case ApplicationCommandOptionType.Mentionable:
      return "Mentionable";
    case ApplicationCommandOptionType.Number:
      return "Number";
    case ApplicationCommandOptionType.Attachment:
      return "Attachment";
    default:
      throw new Error("Unreachable");
  }
}
