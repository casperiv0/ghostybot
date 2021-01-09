import { model, Schema, models, Document } from "mongoose";

export interface IBot extends Document {
  bot_id: string;
  total_used_cmds: number;
  used_since_up: number;
}

const BotSchema = new Schema({
  bot_id: {
    type: String,
    required: true,
  },
  total_used_cmds: {
    type: Number,
    default: 0,
  },
  used_since_up: {
    type: Number,
    default: 0,
  },
});

export default models.Bot || model<IBot>("Bot", BotSchema);
