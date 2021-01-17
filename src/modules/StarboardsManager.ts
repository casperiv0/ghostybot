import StarboardsManager from "discord-starboards";
import StarboardModel from "../models/Starboard.model";
import Bot from "../structures/Bot";

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
  starboards: Starboard[];

  constructor(bot: Bot) {
    super(bot);

    this.starboards = [];
  }

  async getAllStarboards() {
    return await StarboardModel.find();
  }

  async saveStarboard(data: Starboard) {
    const giv = new StarboardModel(data);
    await giv.save();

    return true;
  }

  async deleteStarboard(channelID: string, emoji: string) {
    await StarboardModel.findOneAndDelete({ channelID, emoji });

    return true;
  }

  delete(channelId: string | undefined, emoji: string | undefined) {}

  create(channel: any, options: any) {}
}

export default MongStarboardsManager;
