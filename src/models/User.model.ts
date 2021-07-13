import { Snowflake } from "discord.js";
import { model, Schema, models, Document, ObjectId } from "mongoose";

const userSchema = new Schema({
  user_id: { type: String, required: true },
  guild_id: { type: String, required: true },
  inventory: { type: Array, default: null },
  money: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
  daily: { type: Number, default: null },
  weekly: { type: Number, default: null },
  work: { type: Number, default: null },
  xp: { type: Number, default: 0 },
  afk: {
    type: Object,
    default: {
      is_afk: false,
      reason: null,
    },
  },
  mute: {
    type: Object,
    default: {
      muted: false,
      time: String,
      ends_at: Number,
      reason: String,
    },
  },
  temproles: {
    type: Object,
    default: {
      hasTempRoles: false,
      tempRoles: [],
    },
  },
  reminder: {
    type: Object,
    default: {
      hasReminder: false,
      reminders: [],
    },
  },
});

export type IUser = Document & UserData;

export interface UserData {
  _id: ObjectId;
  user_id: Snowflake;
  guild_id: Snowflake;
  inventory: string[];
  money: number;
  bank: number;
  daily: number;
  weekly: number;
  work: number;
  xp: number;
  afk: AfkObj;
  mute: Mute;
  reminder: Reminders;
  temproles: {
    hasTempRoles: boolean;
    tempRoles: TempRole[];
  };
}

export interface AfkObj {
  is_afk: boolean;
  reason: string | null;
}

export interface Mute {
  muted: boolean;
  ends_at: number;
  reason: string | null;
  time: string | null;
}

export interface Reminders {
  hasReminder: boolean;
  reminders: Reminder[];
}

export interface Reminder {
  _id: string;
  /**
   * uuid but 8 characters long
   */
  id: string;
  channel_id: Snowflake;
  msg: string;
  time: string;
  ends_at: number;
}

export interface TempRole {
  ms: number;
  roleId: Snowflake;
}

export default models.User || model<IUser>("User", userSchema);
