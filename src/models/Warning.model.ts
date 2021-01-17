import { model, Schema, models, Document } from "mongoose";

export interface IWarning extends Document {
  user_id: string;
  guild_id: string;
  reason: string | null;
  date: number;
}

export interface UserWarnings {
  user_id: string;
  guild_id: string;
  reason: string | null;
  date: number;
}

const warningSchema = new Schema({
  user_id: { type: String, required: true },
  guild_id: { type: String, required: true },
  reason: { type: String, default: null },
  date: { type: Number, default: () => Date.now() },
});

export default models.Warning || model<IWarning>("Warning", warningSchema);
