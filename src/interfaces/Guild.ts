import { CategoryChannel, Channel, Guild as DiscordGuild, Role } from "discord.js";
import { GuildData } from "models/Guild.model";

// @ts-expect-error ignore
interface Guild extends GuildData, DiscordGuild {
  inGuild: boolean;
  channels: Channel[];
  roles: Role[];
  categories: CategoryChannel[];
  permissions: unknown;
}

export default Guild;
