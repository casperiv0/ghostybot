import { CategoryChannel, Channel, Role } from "discord.js";
import { GuildData } from "../models/Guild.model";

interface Guild extends GuildData {
  id: string;
  name: string;
  icon: string | null;
  owner_id: string;
  permissions: string;
  region: string;
  roles: Role[];
  channels: Channel[];
  inGuild: boolean;

  categories: CategoryChannel[];
}

export default Guild;
