import { model, Schema, models, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  user_id: string;
  guild_id: string;
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
}

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
  reminder: {
    type: Object,
    default: {
      hasReminder: false,
      reminders: [],
    },
  },
});

export interface UserData {
  _id: ObjectId;
  user_id: string;
  guild_id: string;
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
  id: number;
  channel_id: string;
  msg: string;
  time: string;
  ends_at: number;
}

export default models.User || model<IUser>("User", userSchema);
