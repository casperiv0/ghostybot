import StarboardsManager, { Starboard as StarboardData } from "discord-starboards";
import StarboardModel from "models/Starboard.model";

export interface Starboard {
  channelId: string;
  guildId: string;
  messageId: string;

  emoji: string;
  starBotMsg: boolean;
  selfStar: boolean;
  starEmbed: boolean;
  attachments: boolean;
  resolveImageUrl: boolean;
  threshold: number;
  color: string;
  allowNsfw: boolean;
}

/**
 * @deprecated will be removed when message intents arrive
 */
export class MongoStarboardsManager extends StarboardsManager {
  async getAllStarboards() {
    return StarboardModel.find();
  }

  async saveStarboard(data: StarboardData) {
    const giv = new StarboardModel(data);
    await giv.save();

    return true;
  }

  async deleteStarboard(channelId: string, emoji: string) {
    await StarboardModel.findOneAndDelete({ channelId, "options.emoji": emoji });

    return true;
  }
}
