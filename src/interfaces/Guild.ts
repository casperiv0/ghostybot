import * as DJS from "discord.js";
import { GuildData, SlashCommand } from "models/Guild.model";
import { IReaction } from "models/Reactions.model";

// @ts-expect-error ignore
export interface Guild<R extends boolean = false> extends GuildData, DJS.Guild {
  inGuild: boolean;
  channels: DJS.Channel[];
  roles: DJS.Role[];
  categories: DJS.CategoryChannel[];
  permissions: unknown;
  slash_commands: SlashCommand[];
  reactions: R extends true ? IReaction[] : null;
}
