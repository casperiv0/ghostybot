import { model, Schema, models, Document } from "mongoose";

export interface IBlacklist extends Document {
  user_id: string;
}

const blacklistSchema = new Schema({
  user_id: { type: String, required: true },
});

export default models.Blacklisted || model<IBlacklist>("Blacklisted", blacklistSchema);
