import { Channel, Role } from "discord.js";

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner_id: string;
  permissions: string;
  region: string;
  roles: Role[];
  channels: Channel[];
  inGuild: boolean;
}

export default Guild;
