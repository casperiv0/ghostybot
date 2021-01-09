import { model, Schema, models, Document } from "mongoose";
import { AfkObj, Mute, Reminders } from "../utils/Util";

export interface IUser extends Document {
  user_id: string;
  guild_id: string;
  inventory: any[];
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

export default models.User || model<IUser>("User", userSchema);
