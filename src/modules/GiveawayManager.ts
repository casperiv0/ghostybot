import { GiveawayData, GiveawaysManager } from "discord-giveaways";
import GiveawayModel from "../models/Giveaway.model";

export default class MongoGiveawayManager extends GiveawaysManager {
  async getAllGiveaways() {
    return await GiveawayModel.find();
  }

  async saveGiveaway(messageId: string, giveawayData: GiveawayData): Promise<boolean> {
    const giv = new GiveawayModel(giveawayData);
    await giv.save();

    return true;
  }

  async editGiveaway(messageId: string, giveawayData: GiveawayData): Promise<boolean> {
    await GiveawayModel.findOneAndUpdate({ messageId }, giveawayData).exec();

    return true;
  }

  async deleteGiveaway(messageId: string): Promise<void> {
    await GiveawayModel.findOneAndDelete({ messageID: messageId });
  }
}
