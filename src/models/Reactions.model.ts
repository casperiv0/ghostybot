import { model, Schema, models, Document } from "mongoose";

const ReactionsSchema = new Schema({
  guild_id: { type: String, required: true },
  message_id: { type: String, required: true },
  channel_id: { type: String, required: true },
  reactions: { type: Array, required: true },
});

export default models.Reaction || model("Reaction", ReactionsSchema);
