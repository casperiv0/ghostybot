import { GiveawaysManager } from "discord-giveaways";
import { prisma } from "utils/prisma";

export class MongoGiveawayManager extends GiveawaysManager {
  async getAllGiveaways() {
    return prisma.giveaways.findMany() as any;
  }

  async saveGiveaway(messageId: string, giveawayData: any) {
    await prisma.giveaways.create({
      data: { messageId, ...giveawayData },
    });

    return true;
  }

  async editGiveaway(messageId: string, giveawayData: any): Promise<boolean> {
    await prisma.giveaways.updateMany({
      where: { messageId },
      data: giveawayData,
    });

    return true;
  }

  async deleteGiveaway(messageId: string): Promise<boolean> {
    await prisma.giveaways.deleteMany({
      where: { messageId },
    });

    return true;
  }
}
