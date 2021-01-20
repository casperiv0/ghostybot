import StarboardsManager, {
  StarboardClientOptions,
  Starboard as StarboardData,
} from "discord-starboards";
import { Client } from "discord.js";
import StarboardModel from "../models/Starboard.model";

export interface Starboard {
  channelID: string;
  guildID: string;
  messageID: string;

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

class MongStarboardsManager extends StarboardsManager {
  constructor(client: Client, options?: StarboardClientOptions) {
    super(client, options);
  }

  async getAllStarboards() {
    return await StarboardModel.find();
  }

  async saveStarboard(data: StarboardData) {
    const giv = new StarboardModel(data);
    await giv.save();

    return true;
  }

  async deleteStarboard(channelID: string, emoji: string) {
    await StarboardModel.findOneAndDelete({ channelID, "options.emoji": emoji });

    return true;
  }
}

export default MongStarboardsManager;
