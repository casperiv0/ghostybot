import StarboardsManager from "discord-starboards";
import StarboardModel from "../models/Starboard.model";
import Bot from "../structures/Bot";

class MongStarboardsManager extends StarboardsManager {
  constructor(bot: Bot) {
    super(bot);
  }

  async getAllStarboards() {
    return await StarboardModel.find();
  }

  async saveStarboard(data: any) {
    const giv = new StarboardModel(data);
    await giv.save();

    return true;
  }

  async deleteStarboard(channelID: string, emoji: string) {
    await StarboardModel.findOneAndDelete({ channelID, emoji });

    return true;
  }
}

export default MongStarboardsManager;
