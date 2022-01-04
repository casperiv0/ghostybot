import { Snowflake } from "discord.js";
import { model, Schema, models, Document, ObjectId } from "mongoose";

const DEFAULT_MESSAGE = `**Username:** {user.username}
**Tag:** {user.tag}
**Id:** {user.id}
`;

export interface GuildData {
  _id: ObjectId;
  guild_id: Snowflake;
  prefix: string;
  locale: string;
  store: StoreItem[];
  announcement_channel: Snowflake | null;
  suggest_channel: Snowflake | null;
  audit_channel: Snowflake | null;
  disabled_commands: string[];
  disabled_categories: string[];
  ignored_channels: string[];
  sticky_data: StickyData;
  timezone: string;
  auto_delete_cmd: boolean;
  level_data: LevelData;
  welcome_data: WelcomeData;
  leave_data: LeaveData;
  ban_data: BanData;
  ticket_data: TicketData;
  verify_data: VerifyData;
  slash_commands: SlashCommand[];
}

export type IGuild = Document & GuildData;

export interface StoreItem {
  name: string;
  price: number;
}

export interface StickyData {
  channel_id: Snowflake;
  message: string;
  message_id: Snowflake;
}

export interface LeaveData {
  enabled: boolean;
  channel_id: Snowflake | null;
  message: string | null;
  ignore_bots: boolean;
}

export interface WelcomeData {
  enabled: boolean;
  channel_id: Snowflake | null;
  role_id: Snowflake | null;
  message: string | null;
  ignore_bots: boolean;
}

export interface LevelData {
  message: string;
  enabled: boolean;
}

export interface SlashCommand {
  response: string;
  name: string;
  description: string;
  slash_cmd_id: Snowflake;
}

export interface TicketData {
  enabled: boolean;
  channel_id: Snowflake | null;
  parent_id: Snowflake | string | null;
  role_id: Snowflake | string | null;
}

export interface BanData {
  enabled: boolean;
  message: string;
}

export interface VerifyData {
  enabled: boolean;
  role_id: Snowflake | null;
  channel_id: Snowflake | null;
}

const guildSchema = new Schema({
  guild_id: { type: String, required: true },
  prefix: { type: String, default: "!" },
  store: { type: Array, default: null },
  announcement_channel: { type: String, default: null },
  suggest_channel: { type: String, default: null },
  audit_channel: { type: String, default: null },
  disabled_commands: { type: Array, default: [] },
  disabled_categories: { type: Array, default: [] },
  sticky_data: { type: Object, default: null },
  locale: { type: String, default: "english" },
  ignored_channels: { type: Array, default: [] },
  timezone: { type: String, default: "America/New_York" },
  auto_delete_cmd: { type: Boolean, default: false },
  slash_commands: { type: Array, default: [] },

  level_data: {
    type: Object,
    default: { message: "{user.tag} advanced to level {newLevel}", enabled: true },
  },
  welcome_data: {
    type: Object,
    default: {
      message: DEFAULT_MESSAGE,
      enabled: false,
      channel_id: null,
      role_id: null,
      ignore_bots: false,
    },
  },
  leave_data: {
    type: Object,
    default: { message: DEFAULT_MESSAGE, enabled: false, channel_id: null, ignore_bots: false },
  },
  ban_data: {
    type: Object,
    default: { enabled: true, message: "{user} was banned for {reason}" },
  },
  ticket_data: {
    type: Object,
    default: { enabled: false, channel_id: null, parent_id: null, role_id: null },
  },
  verify_data: {
    type: Object,
    default: { enabled: false, channel_id: null, emoji: "✅", role_id: null },
  },
});

export default models.Guild || model("Guild", guildSchema);
