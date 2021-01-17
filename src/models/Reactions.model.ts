import { model, Schema, models, Document } from "mongoose";

export interface IReaction extends Document {
  guild_id: string;
  message_id: string;
  channel_id: string;
  reactions: Reaction[];
}

export interface Reaction {
  role_id: string;
  emoji: string;
}

const ReactionsSchema = new Schema({
  guild_id: { type: String, required: true },
  message_id: { type: String, required: true },
  channel_id: { type: String, required: true },
  reactions: { type: Array, required: true },
});

export default models.Reaction || model<IReaction>("Reaction", ReactionsSchema);
