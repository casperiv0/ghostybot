import type { GuildsSlashCommands, guilds } from "@prisma/client";
import * as DJS from "discord.js";
import { IReaction } from "models/Reactions.model";

// @ts-expect-error ignore
export interface Guild<R extends boolean = false> extends guilds, DJS.Guild {
  inGuild: boolean;
  channels: DJS.Channel[];
  roles: DJS.Role[];
  categories: DJS.CategoryChannel[];
  permissions: unknown;
  slash_commands: GuildsSlashCommands[];
  reactions: R extends true ? IReaction[] : null;
}
