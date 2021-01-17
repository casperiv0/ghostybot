import { GiveawayData, GiveawaysManager } from "discord-giveaways";
import GiveawayModel from "../models/Giveaway.model";

export default class MongoGiveawayManager extends GiveawaysManager {
  async saveGiveaway(messageId: string, giveawayData: GiveawayData): Promise<boolean> {
    const giv = new GiveawayModel(giveawayData);
    await giv.save();

    return true;
  }

  async editGiveaway(messageId: string, giveawayData: GiveawayData): Promise<boolean> {
    await this.deleteGiveaway(messageId);

    await this.saveGiveaway(messageId, giveawayData);
    return true;
  }

  async deleteGiveaway(messageId: string): Promise<void> {
    await GiveawayModel.findOneAndDelete({ messageID: messageId });
  }
}
