import * as DJS from "discord.js";
import { GuildData, SlashCommand } from "models/Guild.model";

// @ts-expect-error ignore
interface Guild extends GuildData, DJS.Guild {
  inGuild: boolean;
  channels: DJS.Channel[];
  roles: DJS.Role[];
  categories: DJS.CategoryChannel[];
  permissions: unknown;
  slash_commands: SlashCommand[];
}

export default Guild;
