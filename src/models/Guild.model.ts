import { model, Schema, models, Document, ObjectId } from "mongoose";

const DEFAULT_MESSAGE = `**Username:** {user.username}
**Tag:** {user.tag}
**Id:** {user.id}
`;

export interface GuildData {
  _id: ObjectId;
  guild_id: string;
  prefix: string;
  locale: string;
  store: StoreItem[];
  blacklistedwords: string[];
  announcement_channel: string | null;
  suggest_channel: string | null;
  audit_channel: string | null;
  custom_commands: CustomCommand[];
  disabled_commands: string[];
  disabled_categories: string[];
  ignored_channels: string[];
  sticky_data: StickyData;
  timezone: string;
  auto_delete_cmd: boolean;
  member_count_channel_id: string;
  muted_role_id: string;
  level_data: LevelData;
  welcome_data: WelcomeData;
  leave_data: LeaveData;
  starboards_data: StarboardData;
  ban_data: BanData;
  ticket_data: TicketData;
  verify_data: VerifyData;
}

export interface IGuild extends Document {
  guild_id: string;
  prefix: string;
  locale: string;
  store: StoreItem[];
  blacklistedwords: string[];
  announcement_channel: string | null;
  suggest_channel: string | null;
  audit_channel: string | null;
  custom_commands: CustomCommand[];
  disabled_commands: string[];
  disabled_categories: string[];
  ignored_channels: string[];
  sticky_data: StickyData;
  timezone: string;
  auto_delete_cmd: boolean;
  member_count_channel_id: string;
  muted_role_id: string;
  level_data: LevelData;
  welcome_data: WelcomeData;
  leave_data: LeaveData;
  starboards_data: StarboardData;
  ban_data: BanData;
  ticket_data: TicketData;
}

export interface StoreItem {
  name: string;
  price: number;
}

export interface StickyData {
  channel_id: string;
  message: string;
  message_id: string;
}

export interface LeaveData {
  enabled: boolean;
  channel_id: string | null;
  message: string | null;
}

export interface WelcomeData {
  enabled: boolean;
  channel_id: string | null;
  role_id: string | null;
  message: string | null;
}

export interface LevelData {
  message: string;
  enabled: boolean;
}

export interface CustomCommand {
  response: string;
  name: string;
}

export interface StarboardData {
  enabled: boolean;
  channel_id: string;
  emoji: string;
}

export interface TicketData {
  enabled: boolean;
  channel_id: string | null;
  parent_id: string | null;
  role_id: string | null;
}

export interface BanData {
  enabled: boolean;
  message: string;
}

export interface VerifyData {
  enabled: boolean;
  role_id: string | null;
  channel_id: string | null;
}

const guildSchema = new Schema({
  guild_id: { type: String, required: true },
  prefix: { type: String, default: "!" },
  store: { type: Array, default: null },
  blacklistedwords: { type: Array, default: [] },
  announcement_channel: { type: String, default: null },
  suggest_channel: { type: String, default: null },
  audit_channel: { type: String, default: null },
  custom_commands: { type: Array, default: [] },
  disabled_commands: { type: Array, default: [] },
  disabled_categories: { type: Array, default: [] },
  sticky_data: { type: Object, default: null },
  locale: { type: String, default: "english" },
  ignored_channels: { type: Array, default: [] },
  timezone: { type: String, default: "America/New_York" },
  auto_delete_cmd: { type: Boolean, default: false },
  member_count_channel_id: { type: String, default: null },
  muted_role_id: { type: String, default: null },

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
    },
  },
  leave_data: {
    type: Object,
    default: { message: DEFAULT_MESSAGE, enabled: false, channel_id: null },
  },
  ban_data: {
    type: Object,
    default: { enabled: true, message: "{user} was banned for {reason}" },
  },
  ticket_data: {
    type: Object,
    default: { enabled: false, channel_id: null, parent_id: null, role_id: null },
  },
  starboards_data: {
    type: Object,
    default: { enabled: false, channel_id: null, emoji: "⭐" },
  },
  verify_data: {
    type: Object,
    default: { enabled: false, channel_id: null, emoji: "✅", role_id: null },
  },
});

export default models.Guild || model("Guild", guildSchema);
