import type { GuildsSlashCommands, guilds, reactions } from "@prisma/client";
import * as DJS from "discord.js";

// @ts-expect-error ignore
export interface Guild<R extends boolean = false> extends guilds, DJS.Guild {
  inGuild: boolean;
  channels: DJS.GuildTextBasedChannel[];
  roles: DJS.Role[];
  categories: DJS.CategoryChannel[];
  permissions: unknown;
  slash_commands: GuildsSlashCommands[];
  reactions: R extends true ? reactions[] : null;
}
